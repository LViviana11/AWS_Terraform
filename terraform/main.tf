module "dynamodb" {
  source              = "./modules/dynamodb"
  dynamodb_table_name = var.dynamodb_table_name
}

module "iam" {
  source = "./modules/iam"
}

module "lambda" {
  source                  = "./modules/lambda"
  crud_lambda_function_name    = var.crud_lambda_function_name
  s3_lambda_function_name = var.s3_lambda_function_name
  lambda_role_arn         = module.iam.lambda_dynamodb_s3_role_arn
}


module "s3" {
  source        = "./modules/s3"
  s3_bucket_name = var.s3_bucket_name
  lambda_role_arn     = module.iam.lambda_dynamodb_s3_role_arn
  # s3_register_lambda_arn = module.lambda.s3_lambda_invoke_arn
  s3_register_lambda_arn = module.lambda.s3_lambda_function_arn #nuevo
  s3_register_lambda_name = module.lambda.s3_lambda_function_name
  
}



module "api_gateway" {
  source = "./modules/api_gateway"
  lambda_invoke_arn    = module.lambda.crud_lambda_invoke_arn
  lambda_function_name = module.lambda.crud_lambda_function_name
}



#Subir archivo JSON a S3
resource "aws_s3_object" "students_json" {
  bucket = "${module.s3.bucket_s3_name}"
  key    = "students_data.json"
  source = "./data/students_data.json"
  depends_on = [module.s3, module.lambda]
}

# Subir archivo CSV a S3
# resource "aws_s3_object" "students_csv" {
#   bucket = "${module.s3.bucket_s3_name}"
#   key    = "students.csv"
#   source = "./data/students_data.csv"
#   depends_on = [module.s3, module.lambda]
# }