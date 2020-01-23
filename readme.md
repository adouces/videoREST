# VideoREST Project
Desarrollo de una API REST como objeto de un ejercicio.

## Requerimientos
Para poder correr este proyecto se necesita lo siguiente:
1. [NodeJS](https://nodejs.org) instalado 
2. Una DB [MySQL](https://www.mysql.com/) o [MariaDB](https://mariadb.org/) disponible y sus datos de conexión (ver `./config/config.sample.json`)

## Como correr
Para correr este proyecto hay que seguir los siguientes pasos:

1. Descargar el código
2. Instalar las dependencias con `npm install`
3. Copiar `./config/config.sample.json` a `./config/config.json` 
4. Completar `./config/config.json` con los datos de conexion
5. Correr `npm run db:feed` para inicializar la base de datos
6. Correr `npm start` para iniciar la API REST

## Arquitectura
El código implementado en este proyecto se basa en las siguientes capas de arquitectura.
```
User <=> REST API <=> Service <=> Model <=> [MySQL|MariaDB]
```

### API REST
Es la interfaz de usuario con la responsabilidad de validar los parametros de entrada.

### Servicios 
Es una etapa de abstracción entre la API y el Modelo.
Reciven la información validada del usuario de API y ejectutan las operaciones CRUD a traves del Modelo. En caso de ser necesario, transforma los parametros en información que el Modelo entiende.

### Modelo
Modela la representación de la entidad con sus propiedades y su relación con otras entidades. Utilizando Sequelize conectamos la modelización con la consulta a la base de datos.

## API REST

### POST /api/peliculas
Todas las siguientes propiedades son requeridas: 
- nombre
- pais de origen
- fecha de estreno
- director
- reparto

### GET /api/peliculas?page&nombre
1. por default devuelve la primera pagina ordenada por nombre
2. si recibo pagina devuelvo la pagina
3. si recibo nombre busco por nombre y devuelvo los resultados paginados

### GET /api/peliculas/:id
devuelve la pelicula del id especificado


### PATCH /api/peliculas/:id
Cualquiera de las siguientes propiedades pero como minimo una es requerida:
- nombre
- pais de origen
- fecha de estreno
- director
- reparto

### DELETE /api/peliculas/:id
elimina la pelicula con el id especificado