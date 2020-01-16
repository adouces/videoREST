const {Model, DataTypes } = require('sequelize');
const sequelize = require('../dbconnection');


class Peliculas extends Model {

}

Peliculas.init({
    nombre: DataTypes.STRING,
    pais: DataTypes.STRING,
    fecha_estreno: DataTypes.DATEONLY,
    director: DataTypes.STRING,
    reparto: DataTypes.STRING
  }, { sequelize, modelName: 'peliculas' });

  module.exports = Peliculas;