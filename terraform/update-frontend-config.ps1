# Obtener la URL del API Gateway desde Terraform
$API_URL = terraform output -raw api_gateway_url
Write-Host "API_URL obtained: $API_URL"

# Añadir /dev al final de la URL
$API_URL_WITH_DEV = "$API_URL/dev/"

# Leer el contenido del archivo environment.ts
$envFilePath = "C:\Users\vivia\Documents\crud_student\front_angular_student\src\environments\environment.ts"
$envProdFilePath = "C:\Users\vivia\Documents\crud_student\front_angular_student\src\environments\environment.prod.ts"

$envContent = Get-Content -Path $envFilePath -Raw
$envProdContent = Get-Content -Path $envProdFilePath -Raw

# Reemplazar cualquier valor existente de apiUrl en los archivos de configuración de Angular
$envContent = $envContent -replace "apiUrl: '.*'", "apiUrl: '$API_URL_WITH_DEV'"
$envProdContent = $envProdContent -replace "apiUrl: '.*'", "apiUrl: '$API_URL_WITH_DEV'"

# Escribir el contenido actualizado de nuevo en los archivos
$envContent | Set-Content -Path $envFilePath
$envProdContent | Set-Content -Path $envProdFilePath

Write-Host "Updated Angular environment configuration with API URL: $API_URL_WITH_DEV"
