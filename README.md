# tfcd

```sh
# Write git short sha into version file
git rev-parse --short=7 HEAD > version
# Print S3 version file content
aws s3 cp s3://tfcd-app/version -
# Print file tags
aws s3api get-object-tagging --bucket tfcd-app --key version
```
