#!/usr/bin/env bash
# Build and publish the static site to S3 + CloudFront.
#
#   ./scripts/deploy-aws.sh                     # staging: cloudfront.net URL, noindex
#   SITE_URL=https://sureride.in NOINDEX=0 \
#     ./scripts/deploy-aws.sh                   # production
#
# NOINDEX defaults to 1 on purpose: any deploy that is not the real domain must
# not be indexed, or it competes with the production site for the same content.
set -euo pipefail

BUCKET="${BUCKET:-sureride-site-706262411123}"
DIST_ID="${DIST_ID:-ER0YGWX7KH6L4}"
NOINDEX="${NOINDEX:-1}"
AWS_PROFILE_NAME="${AWS_PROFILE:-default}"
EXPECTED_ACCOUNT="706262411123"
FARES_CONFIRMED="${FARES_CONFIRMED:-0}"
VEHICLE_RATES_CONFIRMED="${VEHICLE_RATES_CONFIRMED:-0}"
SITE_PHOTOS_APPROVED="${SITE_PHOTOS_APPROVED:-0}"
DRIVER_PHOTOS_APPROVED="${DRIVER_PHOTOS_APPROVED:-0}"
AWS=(aws --profile "$AWS_PROFILE_NAME")

cd "$(dirname "$0")/.."

ACTUAL_ACCOUNT=$("${AWS[@]}" sts get-caller-identity --query Account --output text)
if [[ "$ACTUAL_ACCOUNT" != "$EXPECTED_ACCOUNT" ]]; then
  echo "Refusing to deploy: profile '$AWS_PROFILE_NAME' is account $ACTUAL_ACCOUNT, expected $EXPECTED_ACCOUNT." >&2
  exit 1
fi

DIST_DOMAIN=$("${AWS[@]}" cloudfront get-distribution --id "$DIST_ID" --query 'Distribution.DomainName' --output text)
SITE_URL="${SITE_URL:-https://${DIST_DOMAIN}}"

echo "▸ generating image variants"
npm run images --silent

echo "▸ building for ${SITE_URL}  (noindex=${NOINDEX}, route-fares=${FARES_CONFIRMED}, vehicle-rates=${VEHICLE_RATES_CONFIRMED}, site-photos=${SITE_PHOTOS_APPROVED}, driver-photos=${DRIVER_PHOTOS_APPROVED})"
rm -rf .next out
NEXT_PUBLIC_SITE_URL="$SITE_URL" \
NEXT_PUBLIC_NOINDEX="$NOINDEX" \
NEXT_PUBLIC_FARES_CONFIRMED="$FARES_CONFIRMED" \
NEXT_PUBLIC_VEHICLE_RATES_CONFIRMED="$VEHICLE_RATES_CONFIRMED" \
NEXT_PUBLIC_SITE_PHOTOS_APPROVED="$SITE_PHOTOS_APPROVED" \
NEXT_PUBLIC_DRIVER_PHOTOS_APPROVED="$DRIVER_PHOTOS_APPROVED" \
npm run build >/dev/null
echo "  $(find out -name '*.html' | wc -l | tr -d ' ') pages built"

echo "▸ syncing to s3://${BUCKET}"
# Fingerprinted build output — safe to cache forever.
"${AWS[@]}" s3 sync out/_next/static "s3://${BUCKET}/_next/static" \
  --cache-control "public,max-age=31536000,immutable" --only-show-errors

# Images change rarely but are not fingerprinted.
if [ -d out/og ]; then
  "${AWS[@]}" s3 sync out/og "s3://${BUCKET}/og" --delete \
    --cache-control "public,max-age=86400" --only-show-errors
fi

if [[ "$SITE_PHOTOS_APPROVED" == "1" ]] && [ -d out/photos ]; then
  "${AWS[@]}" s3 sync out/photos "s3://${BUCKET}/photos" --delete \
    --exclude "drivers/*" --exclude ".DS_Store" --exclude "*/.DS_Store" \
    --cache-control "public,max-age=86400" --only-show-errors
else
  echo "▸ removing unapproved site photos from the public bucket"
  "${AWS[@]}" s3 rm "s3://${BUCKET}/photos" --recursive --only-show-errors
fi

# Driver portraits are a separate, fail-closed category. Approving general site
# imagery must never make a generated face publicly fetchable.
if [[ "$DRIVER_PHOTOS_APPROVED" == "1" ]] && [ -d out/photos/drivers ]; then
  "${AWS[@]}" s3 sync out/photos/drivers "s3://${BUCKET}/photos/drivers" --delete \
    --exclude ".DS_Store" --cache-control "public,max-age=86400" --only-show-errors
else
  echo "▸ ensuring driver portraits are absent from the public bucket"
  "${AWS[@]}" s3 rm "s3://${BUCKET}/photos/drivers" --recursive --only-show-errors
fi

# Everything else, HTML included — must revalidate so edits appear immediately.
"${AWS[@]}" s3 sync out "s3://${BUCKET}" --delete \
  --exclude "_next/static/*" --exclude "og/*" --exclude "photos/*" \
  --exclude ".DS_Store" --exclude "*/.DS_Store" \
  --cache-control "public,max-age=0,must-revalidate" --only-show-errors

# An exclude prevents upload but also prevents `sync --delete` from removing an
# older object. Delete the known macOS metadata key explicitly.
"${AWS[@]}" s3api delete-object --bucket "$BUCKET" --key ".DS_Store" >/dev/null

echo "▸ invalidating"
INV=$("${AWS[@]}" cloudfront create-invalidation --distribution-id "$DIST_ID" --paths "/*" \
  --query 'Invalidation.Id' --output text)
echo "  $INV"
echo "▸ https://${DIST_DOMAIN}"
