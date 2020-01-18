const {Router} = require('express');
const Joi = require('joi');
const Peliculas = require('../services/peliculas');
const router = Router();

router.get('/api/peliculas', (req, res) => {
    const { page = 1, nombre } = req.query;
    if(page<1) {
        return res.status(400).json({
            status: 400,
            errorCode: "bad_request",
            message: "Invalid page range"
        });
    }
    Peliculas.Query.search({nombre, page}).then((result) => {
        res.status(200).json(result);    
    });
});

router.get('/api/peliculas/:id', (req, res) => {
    const { id } = req.params;
    Peliculas.Query.getone(id).then( (result) => {
        res.status(200).json(result);
    });
});

router.post('/api/peliculas', (req, res) => {
    console.log(new Date(req.body.fecha_estreno));
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
        res.status(500).json({
            status: 500,
            errorCode: "internal_server_error",
            message: "Internal server error"
        });
    });
});

router.patch('/api/peliculas/:id', (req, res) => {
    const { id } = req.params;
    Peliculas.Query.update(id, req.body).then( (updated) => {
        res.status(200).json(updated);
    });
});

router.delete('/api/peliculas/:id', (req, res) => {
    const { id } = req.params;
    Peliculas.Query.delete(id).then( (result) => {
        res.sendStatus(204);
    });
})








router.post('/api/peliculas/add', (req, res) => {
    const schema = {
        name: Joi.string().required()
    };
    const result = Joi.validate(req.body, schema)
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const movie = {
        name: req.body.name,
        pais: req.body.pais,
        date: req.body.date,
        dir: req.body.director,
        cast: req.body.cast
    };
    Peliculas.Query.add(movie);
    res.send(movie);
});

module.exports = router;