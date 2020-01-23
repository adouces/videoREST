const Joi = require('joi');

const schemas = {
    id: {
        id: Joi.number().integer()
    },
    page: {
        page: Joi.number().integer().min(1),
        nombre:Joi.string()
    },
    movie: {
        nombre: Joi.string().required(),
        pais: Joi.string(),
        fecha_estreno: Joi.date(),
        director: Joi.string(),
        reparto: Joi.string()
    }

};

module.exports = schemas;