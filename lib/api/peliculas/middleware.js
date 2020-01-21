const dataVerificator = require('./validators');


const middleware = {
    getPeliculasValidation: (req, res, next) => {
        const validationError = dataVerificator.pageV(req.query);

        if (validationError) {
            return res.status(validationError.status || 400).json(validationError);
        }

        return next();
    },
    idPeliculasValidation: (req, res, next) => {
        const validationError = dataVerificator.idV(req.params);

        if(validationError) {
            return res.status(validationError.status || 400).json(validationError);
        }

        return next();
    },
    PeliculasValidation: (req, res, next) => {
        const validationError = dataVerificator.nombreV(req.body);
        if(validationError) {
            return res.status(validationError.status || 400).json(validationError);
        }

        return next();
    }
}

module.exports = middleware;