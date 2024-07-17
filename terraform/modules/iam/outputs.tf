output "lambda_dynamodb_s3_role_arn" {
  description = "The ARN of the IAM role for Lambda with DynamoDB and S3 access"
  value       = aws_iam_role.lambda_dynamodb_s3_role.arn
}
