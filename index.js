const express = require('express');
const peliculasAPI = require('./lib/api/peliculas');
const bodyParser = require('body-parser');
const app = module.exports = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

app.use(peliculasAPI);


const port = process.env.PORT || 3000;

app.listen(port, () => {console.log(`Listening on port ${port}`)});

