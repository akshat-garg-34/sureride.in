#!/usr/bin/env bash
# Finish the switch to sureride.in. Safe to re-run; each step is idempotent.
#
# Prerequisite: the domain's nameservers must already point at Route 53,
# otherwise ACM cannot validate and this script will wait and then stop.
set -euo pipefail
cd "$(dirname "$0")/.."

DOMAIN="sureride.in"
DIST_ID="ER0YGWX7KH6L4"
ZONE_ID="Z042003725L0MKW2S5EVR"
CERT_ARN="arn:aws:acm:us-east-1:706262411123:certificate/48f72d99-6286-445e-8423-47f4e4ec9868"
AWS_PROFILE_NAME="${AWS_PROFILE:-default}"
EXPECTED_ACCOUNT="706262411123"
AWS=(aws --profile "$AWS_PROFILE_NAME")

ACTUAL_ACCOUNT=$("${AWS[@]}" sts get-caller-identity --query Account --output text)
if [[ "$ACTUAL_ACCOUNT" != "$EXPECTED_ACCOUNT" ]]; then
  echo "Refusing to continue: profile '$AWS_PROFILE_NAME' is account $ACTUAL_ACCOUNT, expected $EXPECTED_ACCOUNT." >&2
  exit 1
fi

echo "▸ 1/5  checking nameserver delegation"
# Ask the TLD servers, not a public resolver: the delegation lives in the TLD
# zone, and 8.8.8.8 will serve a stale copy for up to its TTL (3600s for .in).
TLD_NS=$(dig +short NS "${DOMAIN##*.}." | head -1)
LIVE_NS=$(dig +noall +authority NS "$DOMAIN" @"${TLD_NS:-8.8.8.8}" 2>/dev/null \
  | awk '$4=="NS"{print tolower($5)}' | sort | tr '\n' ' ')
if [[ "$LIVE_NS" != *"awsdns"* ]]; then
  echo "   ✗ still on: $LIVE_NS"
  echo "   Point the registrar at these, then re-run:"
  "${AWS[@]}" route53 get-hosted-zone --id "$ZONE_ID" --query 'DelegationSet.NameServers' --output text | tr '\t' '\n' | sed 's/^/     /'
  exit 1
fi
echo "   ✓ $LIVE_NS"

echo "▸ 2/5  waiting for the certificate to validate"
"${AWS[@]}" acm wait certificate-validated --region us-east-1 --certificate-arn "$CERT_ARN"
echo "   ✓ issued"

echo "▸ 3/5  attaching certificate + aliases to CloudFront"
"${AWS[@]}" cloudfront get-distribution-config --id "$DIST_ID" > /tmp/sr-dist.json
ETAG=$(python3 -c "import json;print(json.load(open('/tmp/sr-dist.json'))['ETag'])")
python3 - "$DOMAIN" "$CERT_ARN" <<'PY'
import json, sys
domain, cert = sys.argv[1], sys.argv[2]
d = json.load(open('/tmp/sr-dist.json'))['DistributionConfig']
d['Aliases'] = {'Quantity': 2, 'Items': [domain, f'www.{domain}']}
d['ViewerCertificate'] = {
    'ACMCertificateArn': cert, 'SSLSupportMethod': 'sni-only',
    'MinimumProtocolVersion': 'TLSv1.2_2021', 'Certificate': cert,
    'CertificateSource': 'acm',
}
json.dump(d, open('/tmp/sr-dist-new.json', 'w'))
PY
"${AWS[@]}" cloudfront update-distribution --id "$DIST_ID" --if-match "$ETAG" \
  --distribution-config file:///tmp/sr-dist-new.json >/dev/null
echo "   ✓ aliases: $DOMAIN, www.$DOMAIN"

echo "▸ 4/5  pointing DNS at CloudFront"
CF_DOMAIN=$("${AWS[@]}" cloudfront get-distribution --id "$DIST_ID" --query 'Distribution.DomainName' --output text)
python3 - "$DOMAIN" "$CF_DOMAIN" <<'PY'
import json, sys
domain, cf = sys.argv[1], sys.argv[2]
# Z2FDTNDATAQYW2 is the fixed hosted-zone id for every CloudFront distribution.
def rec(name, typ):
    return {'Action': 'UPSERT', 'ResourceRecordSet': {
        'Name': name, 'Type': typ,
        'AliasTarget': {'HostedZoneId': 'Z2FDTNDATAQYW2', 'DNSName': cf, 'EvaluateTargetHealth': False}}}
changes = [rec(domain, t) for t in ('A', 'AAAA')] + [rec(f'www.{domain}', t) for t in ('A', 'AAAA')]
json.dump({'Comment': 'point at CloudFront', 'Changes': changes}, open('/tmp/sr-dns.json', 'w'))
PY
"${AWS[@]}" route53 change-resource-record-sets --hosted-zone-id "$ZONE_ID" \
  --change-batch file:///tmp/sr-dns.json --query 'ChangeInfo.Status' --output text | sed 's/^/   /'

echo "▸ 5/5  deploying as production (indexable)"
AWS_PROFILE="$AWS_PROFILE_NAME" SITE_URL="https://$DOMAIN" NOINDEX=0 \
FARES_CONFIRMED="${FARES_CONFIRMED:-0}" \
VEHICLE_RATES_CONFIRMED="${VEHICLE_RATES_CONFIRMED:-0}" \
SITE_PHOTOS_APPROVED="${SITE_PHOTOS_APPROVED:-0}" \
DRIVER_PHOTOS_APPROVED="${DRIVER_PHOTOS_APPROVED:-0}" \
./scripts/deploy-aws.sh

echo
echo "live: https://$DOMAIN"
