const Joi = require('joi');

const schemas = {
    id: {
        id: Joi.number().integer()
    },
    page: {
        page: Joi.number().integer().min(1)
    },
    movie: {
        nombre: Joi.string().required()
    }

};

module.exports = schemas;