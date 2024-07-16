module "dynamodb" {
    source = "./modules/dynamodb"
    dynamodb_table_name = var.dynamodb_table_name
}


