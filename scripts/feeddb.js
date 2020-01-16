const Peliculas = require('../lib/models/peliculas');
const sync = require('./syncdb');


sync().then(() => Peliculas.create({
    name: 'janedoe',
    pais: 'España',
    fecha_estreno: new Date(1999, 6, 20),
    director: 'Pepe',
    reparto: 'Pepito'
  }))
  .then((jane) => {
    console.log(jane.toJSON());
  });