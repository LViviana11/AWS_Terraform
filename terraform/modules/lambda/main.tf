resource "aws_lambda_function" "student_crud_lambda" {
  filename         = "./lambda_function/zips/lambda_crud_function.zip"
  function_name    = var.crud_lambda_function_name
  role             = var.lambda_role_arn
  handler          = "lambda_crud.handler"
  runtime          = "nodejs18.x"
  memory_size      = 128

  environment {
    variables = {
      DYNAMODB_TABLE = var.dynamodb_table_name
    }
  }
}

resource "aws_lambda_function" "s3_register_lambda" {
  filename         = "./lambda_function/zips/lambda_s3_function.zip"
  function_name    = var.s3_lambda_function_name
  role             = var.lambda_role_arn
  handler          = "lambda_s3.handler"
  runtime          = "nodejs18.x"
  memory_size      = 128

  environment {
    variables = {
      
      DYNAMODB_TABLE = var.dynamodb_table_name
    }
  }
}
