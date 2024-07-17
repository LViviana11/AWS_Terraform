output "crud_lambda_invoke_arn" {
  description = "The ARN to invoke the CRUD Lambda function"
  value       = aws_lambda_function.student_crud_lambda.invoke_arn
}

output "crud_lambda_function_name" {
  description = "The name of the CRUD Lambda function"
  value       = aws_lambda_function.student_crud_lambda.function_name
}

output "s3_lambda_invoke_arn" {
  description = "The ARN to invoke the S3 Lambda function"
  value       = aws_lambda_function.s3_register_lambda.invoke_arn
}

output "s3_lambda_function_name" {
  description = "The name of the S3 Lambda function"
  value       = aws_lambda_function.s3_register_lambda.function_name
}

variable "lambda_role_arn" {
  description = "The ARN of the IAM role for Lambda"
  type        = string
}


#nuevo

output "s3_lambda_function_arn" {
  value = aws_lambda_function.s3_register_lambda.arn
}

output "crud_lambda_function_arn" {
  value = aws_lambda_function.student_crud_lambda.arn
}