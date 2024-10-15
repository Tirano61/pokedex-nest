<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo
1. Clonar el repositorio
2. Ejecutar
```
npm install
```
3. Tener Nest CLI instalado o instalar con el comando
```
npm i -g @nestjs/cli
```
4. Levantar la base de datos
```
docker-compose up -d
```
5. Clonar el archivo ```.env.template``` y renombrar la copia a ```.env````

6. Llenar las variables de entorno definidas en el ```.env```

7. Ejecutar la aplicación en dev:
```
npm run start:dev
```
8. Reconsrtruir la DB con las semillas
```
https://localhost:3000/api/v2/seed
```

### Stack Usado
* MongoDB
* Nest

# Production build
1. Crear archivo ```.env.prod```

2. Llenar las variables de producción

3. Crear la nueva imagen
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```



# Docker

## Build
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build

## Run
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up

## Nota
Por defecto, __docker-compose__ usa el archivo ```.env```, por lo que si tienen el archivo .env y lo configuran con sus variables de entorno de producción, bastaría con
```
docker-compose -f docker-compose.prod.yaml up --build
```



