const {Router} = require('express');
const Peliculas = require('../../services/peliculas');
const Middleware = require('./middleware');
const err = require('./errors');
const router = Router();



router.get('/api/peliculas',Middleware.getPeliculasValidation, (req, res) => {
    const { page = 1, nombre } = req.query;

    Peliculas.Query.search({nombre, page}).then((result) => {
        if(result.length === 0) {
            return res.status(404).json(err.movie_not_found);
        }
        res.status(200).json(result);    
    });
});


router.get('/api/peliculas/:id', Middleware.idPeliculasValidation, (req, res) => {
    const { id } = req.params;
    Peliculas.Query.getone(id).then( (result) => {
        if(!result) {
            return res.status(404).json(err.movie_not_found);
        }
        res.status(200).json(result);
    });
});

router.post('/api/peliculas', Middleware.PeliculasValidation, (req, res) => {
    if (req.body.fecha_estreno){
        req.body.fecha_estreno = new Date(req.body.fecha_estreno);
    }
    Peliculas.Query.add(req.body).then((added) => {
        res.sendStatus(201);
    }).catch((error) => {
        if(error.parent.code === "ER_TRUNCATED_WRONG_VALUE"){
            return res.status(400).json({
                status: 400,
                errorCode: "bad_request",
                message: error.parent.sqlMessage
            });
        }
        res.status(500).json(err.server_error);
    });
});

router.patch('/api/peliculas/:id', Middleware.idPeliculasValidation, (req, res) => {
    const { id } = req.params;
    if (req.body.fecha_estreno){
        req.body.fecha_estreno = new Date(req.body.fecha_estreno);
    }
    Peliculas.Query.update(id, req.body).then( (updated) => {
        res.status(200).json(updated);
    });
});

router.delete('/api/peliculas/:id', Middleware.idPeliculasValidation, (req, res) => {
    const { id } = req.params;
    Peliculas.Query.delete(id).then( (result) => {
        res.sendStatus(204);
    });
});


module.exports = router;