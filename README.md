
# Terraform 

Terraform se utiliza para orquestar la creación de la infraestructura de AWS para respaldar las necesidades operativas de varios componentes de la solución. Esto implica aprovisionar los siguientes recursos:
- API Gateway para exponer los endpoints necesarios para las operaciones CRUD.
- Funciones Lambda para manejar las operaciones CRUD sobre los registros en DynamoDB.
- DynamoDB para almacenar los registros.
- S3 para almacenar archivos cargados.
- IAM para definir las políticas y roles necesarios para el manejo de acceso a los recursos y servicios.


# Condiciones previas
1. **Instalar terraform**

2. **Creación de una cuenta de AWS:**
   Si aún no lo ha hecho, regístrese para obtener una cuenta de AWS en la página oficial de [AWS](https://aws.amazon.com/).  Una vez que haya creado su cuenta, obtendrá un ID de clave de acceso y una clave de acceso secreta.

3. **Obtención de la ID de clave de acceso y la clave de acceso secreta:**
   - Inicie sesión en su consola de administración de AWS.
   - Vaya al panel de IAM (gestión de identidad y acceso).
   - Seleccione “Usuarios” en la barra lateral y elija el usuario cuyas credenciales desea utilizar o cree un nuevo usuario.
   - En la pestaña "Credenciales de seguridad", puede generar un nuevo conjunto de claves de acceso haciendo clic en el botón "Crear clave de acceso".

4. Instalar AWS CLI si aun no lo ha hecho. 

5. **Configurar AWS CLI:**
   - Una vez que tiene sus credenciales, puede configurar la AWS CLI:
   - Abre la terminal o línea de comandos en su computadora.
   - Escriba el comando **aws configure** y presiona Enter. Esto iniciará el proceso de configuración.
   - Ingrese tu **AWS Access Key ID** cuando se le solicite.
   - Ingrese tu **AWS Secret Access Key** cuando se le solicite.
   - Ingrese la Región predeterminada que desea configurar (por ejemplo, us-east-1 para el Norte de Virginia).
   - Ingrese el formato de salida predeterminado que prefiera (por ejemplo, json).

5. **Verificar la configuración:**
   - Puede verificar la configuración con el siguiente comando:
     ```
     aws sts get-caller-identity
     ```
     Este comando le permite obtener detalles sobre las credenciales bajo las cuales está siendo ejecutado su comando AWS CLI actual.

5. **Ajustar las rutas de acceso a los archivos environment.ts y environment.prod.ts en el archivo update-frontend-config.ps1 ubicado en la raiz del proyecto terraform:**
- Esto se hace con el fin de obtener la url actual de la API para conectar el frontend. 

## Ejecutar proyecto Terraform

**Nota: ** Para actualizar la URL de la API usar el comando **.\update-frontend-config.ps1** despues de haber ejecutado el comando **terraform apply**.

```bash
terraform init
terraform validate
terraform apply
terraform show
terraform destroy
```


## Ejecutar proyecto Angular
```bash
npm install
ng serve
```
    