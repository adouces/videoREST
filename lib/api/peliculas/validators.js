const Joi = require('joi');
const err = require('./errors');
const schemas = require('./schemas')

const dataVerificator = {
    pageV: (payload) => {
        const result = Joi.validate(payload, schemas.page);
        if(result.error){
            return err.invalid_page;
        }
        return null;
    },
    nombreV: (payload) => {
        console.log(payload);
        const result = Joi.validate(payload, schemas.movie);
        if(result.error){
            return err.missing_values;
        }
        return null;
    },
    idV: (payload) => {
        const result = Joi.validate(payload, schemas.id);
        if(result.error){
            return err.invalid_id;
        }
        return null;
    }
}

module.exports = dataVerificator;