resource "aws_lambda_function" "student_crud_lambda" {
  filename         = "lambda/lambda_crud_function.zip"
  function_name    = var.crud_lambda_function_name
  role             = aws_iam_role.lambda_dynamodb_s3_role.arn
  handler          = "index.handler"
  runtime          = "nodejs14.x"
  memory_size      = 128

  environment {
    variables = {
      DYNAMODB_TABLE = var.dynamodb_table_name
    }
  }
}

resource "aws_lambda_function" "s3_register_lambda" {
  filename         = "lambda/lambda_s3_function.zip"
  function_name    = var.s3_lambda_function_name
  role             = aws_iam_role.lambda_dynamodb_s3_role.arn
  handler          = "s3_index.handler"
  runtime          = "nodejs14.x"
  memory_size      = 128

  environment {
    variables = {
      
      DYNAMODB_TABLE = var.dynamodb_table_name
    }
  }
}
