const Joi = require('joi');

const dataVerificator = {
    pageV: (validate, res) => {
        const schema = {
            page: Joi.number().integer().min(1)
        };
        const result = Joi.validate(validate, schema)
        if(result.error){
            return res.status(400).json({
                status: 400,
                errorCode: "bad_request",
                message: "Invalid page range"
            });
        }
    },
    nombreV: (validate, res) => {
        const schema = {
            nombre: Joi.string().required()
        };
        const result = Joi.validate(validate, schema)
        if(result.error){
            return res.status(400).json({
                status: 400,
                errorCode: "bad_request",
                message: "Faltan valores requeridos"
            });
        }
    },
    idV: (validate, res) => {
        const schema = {
            id: Joi.number().integer()
        };
        const result = Joi.validate(validate, schema)
        if(result.error){
            return res.status(400).json({
                status: 400,
                errorCode: "bad_request",
                message: "Invalid id"
            });
        }
    }
}

module.exports = dataVerificator;