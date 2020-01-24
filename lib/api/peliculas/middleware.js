const dataVerificator = require('./validators');
const errores = require('./errors');


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
        if(req.body.fecha_estreno){
            req.body.fecha_estreno = new Date(req.body.fecha_estreno);
        }
        const validationError = dataVerificator.movieV(req.body);
        if(validationError) {
            return res.status(validationError.status || 400).json(validationError);
        }

        return next();
    },
    updateValidation: (req, res, next) => {
        if(req.body.fecha_estreno){
            req.body.fecha_estreno = new Date(req.body.fecha_estreno);
        }
        const validationError = dataVerificator.movieVU(req.body);
        if(validationError) {
            return res.status(validationError.status || 400).json(validationError);
        }

        return next();
    }
}

module.exports = middleware;