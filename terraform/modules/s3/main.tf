resource "aws_s3_bucket" "student_uploads_bucket" {
  bucket = var.s3_bucket_name
}



resource "aws_s3_bucket_lifecycle_configuration" "lifecycle" {
  bucket = aws_s3_bucket.student_uploads_bucket.bucket

  rule {
    id     = "cleanup"
    status = "Enabled"

    expiration {
      days = 7  # Elimina objetos después de 30 días
    }
  }
}


# resource "aws_s3_bucket_policy" "bucket_policy" {
#   bucket = aws_s3_bucket.student_uploads_bucket.id
#   policy = jsonencode({
#     Version = "2012-10-17",
#     Statement = [
#       {
#         Sid       = "AllowLambdaFullAccess",
#         Effect    = "Allow",
#         Principal = {
#           AWS = aws_iam_role.lambda_role.arn
#         },
#         Action = [
#           "s3:GetObject",
#           "s3:PutObject",
#           "s3:DeleteObject",
#           "s3:ListBucket",
#           "s3:GetBucketLocation"
#         ],
#         Resource = [
#           "${aws_s3_bucket.student_uploads_bucket.arn}/*",
#           "${aws_s3_bucket.student_uploads_bucket.arn}"
#         ]
#       }
#     ]
#   })
# }

# resource "aws_s3_bucket_notification" "bucket_notification" {
#   bucket = aws_s3_bucket.student_uploads_bucket.id

#   lambda_function {
#     lambda_function_arn = aws_lambda_function.s3_register_lambda.arn
#     events              = ["s3:ObjectCreated:*"]
#   }
# }

# resource "aws_lambda_permission" "allow_s3_to_call_lambda" {
#   statement_id  = "AllowS3Invoke"
#   action        = "lambda:InvokeFunction"
#   function_name = aws_lambda_function.s3_register_lambda.function_name
#   principal     = "s3.amazonaws.com"
#   source_arn    = aws_s3_bucket.student_uploads_bucket.arn
# }
