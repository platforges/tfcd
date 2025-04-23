resource "aws_s3_bucket" "tfcd_app" {
  bucket = "tfcd-app"
}

resource "aws_s3_object" "version_file" {
  bucket = aws_s3_bucket.tfcd_app.id
  key    = "version"
  source = "version"
  etag   = filemd5("version")
}
