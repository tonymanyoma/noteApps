# App para gestion de notas
> App construida en Node js y vue js que permite guardar y consultar notas

## Configuración y requisitos

## Frontend
  - Node jsv18.15.0
  - npm  v 9.5.0
  - vue cli

## Backend
  - mysql
  - Node js v18.15.0
  - npm  v9.5.0

## Instalación

## Frontend
  - Crear archivo .env con la siguiente configuracion 
    ``` 
        VUE_APP_API_TOKEN=P4SSword*!
    ```
  - Ejecutar npm install
  - Lanzar aplicacion con npm run serve


## Backend
  - Crear archivo .env con la configuración de las variables de entorno para la base de datos y token del api 
    ``` 
        PORT=3001
        API_TOKEN=P4SSword*!
        DB_USER=root
        DB_PASSWORD=
        DB_NAME=app_notes
    ```
  - Importar el archivo sql ubicado en la carpeta sql
  - Ejecutar npm install
  - Lanzar aplicacion con node app.js o npm run watch(esta se ejecutará con nodemom)


