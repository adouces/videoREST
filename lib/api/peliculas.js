const {Router} = require('express');
const dataVerificator = require('../handler/dataVerification');
const Peliculas = require('../services/peliculas');
const router = Router();

router.get('/api/peliculas', (req, res) => {
    const { page = 1, nombre } = req.query;
    // if(page<1) {
    //     return res.status(400).json({
    //         status: 400,
    //         errorCode: "bad_request",
    //         message: "Invalid page range"
    //     });
    // }
    dataVerificator.pageV(req.query, res);
    Peliculas.Query.search({nombre, page}).then((result) => {
        res.status(200).json(result);    
    });
});


router.get('/api/peliculas/:id', (req, res) => {
    dataVerificator.idV(req.params, res);
    const { id } = req.params;
    Peliculas.Query.getone(id).then( (result) => {
        res.status(200).json(result);
    });
});

router.post('/api/peliculas', (req, res) => {
    if (req.body.fecha_estreno){
        req.body.fecha_estreno = new Date(req.body.fecha_estreno);
    }
    dataVerificator.nombreV(req.body, res);
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
    dataVerificator.idV(req.params, res);
    const { id } = req.params;
    if (req.body.fecha_estreno){
        req.body.fecha_estreno = new Date(req.body.fecha_estreno);
    }
    Peliculas.Query.update(id, req.body).then( (updated) => {
        res.status(200).json(updated);
    });
});

router.delete('/api/peliculas/:id', (req, res) => {
    dataVerificator.idV(req.params, res);
    const { id } = req.params;
    Peliculas.Query.delete(id).then( (result) => {
        res.sendStatus(204);
    });
});


module.exports = router;