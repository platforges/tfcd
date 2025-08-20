# tfcd

```sh
# Print git version (build.yml)
git rev-parse --short=7 HEAD
# Use personal aws_access_key_id + aws_secret_access_key
awsp personal
# Print S3 version file content
aws s3 cp s3://tfcd-app/version -
# Print file tags
aws s3api get-object-tagging --bucket tfcd-app --key version
```
### Required status checks
- "required-check" -> Taper check that ensures every requirement job ("needs") succeeded or got skiped
