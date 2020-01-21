const Peliculas = require('../models/peliculas');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Query = {
    search: ({nombre, page}) => {
        // Consulta paginado por default/siempre
        const query = {
            offset: 10*(page-1), 
            limit:10, 
            order:[['nombre','ASC']]
        };
        // Solo si recibe nombre para busqueda
        // lo agrega a la consulta
        if (nombre) {
            query.where = {
                nombre:{[Op.like]:`%${nombre}%`}
            }
        }
        // Ejecuta la consulta y devuelve el resultado
        return Peliculas.findAll(query);         
    },
    add: (info) => {
        return Peliculas.create(info);
    },
    delete: (id) => {
        return Peliculas.destroy({
            where: { id }
        });
    },
    update: (id, payload) => {
        const query = {
            where: { id }
        };
        return Peliculas.update(payload, query);
    }, 
    getone: (id) => {
        const query = {
            where: { id }
        };
        return Peliculas.findOne(query);
    }
};

module.exports.Query = Query;