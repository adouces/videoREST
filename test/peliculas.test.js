const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const Peliculas = require('../lib/models/peliculas');
const createDB = require('../scripts/createdb');
const fixtures = require('./fixtures');




chai.use(chaiHttp);
chai.should();

const borrarPeliculas = () => Peliculas.destroy({
  where: {},
  truncate: true
}); 

describe('Peliculas API', () => {
  before(() => createDB(false));
  beforeEach(() => {
    return Peliculas.sync().then( () =>
      borrarPeliculas().then(() => 
        Promise.all(
          fixtures.map(
            movie => Peliculas.create(movie)
          )
        )
      )
    );
  });

  describe('GET /api/peliculas', () => {
    it('it should return 0 movies when empty', (done) => {
      borrarPeliculas()
      .then(() => {
        chai.request(server)
          .get('/api/peliculas')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
          });
      });
    });

    it('should return existent movies', (done) => {
      chai.request(server)
      .get('/api/peliculas')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(10);
        done();
      });
    });

    it('should return existent movies on page 2', (done) => {
      chai.request(server)
      .get('/api/peliculas')
      .query({
        page: 2
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(4);
        done();
      });
    });

    it('should return bad request: page range is invalid', (done) => {
      chai.request(server)
      .get('/api/peliculas')
      .query({
        page: -257
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.errorCode.should.contain("bad_request");
        res.body.message.should.contain("Invalid page range");
        done();
      });
    });
  });

  describe('GET /api/peliculas/:id', () => {
    it('it should return movie of the indicated id', (done) => {
        chai.request(server)
          .get('/api/peliculas/10')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.contain({"nombre": "The Incredibles"});
            done();
          });
    });

    it('it should return not found', (done) => {
      chai.request(server)
        .get('/api/peliculas/99')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.errorCode.should.contain('not_found');
          res.body.message.should.contain('No coincide ninguna pelicula');
          done();
        });
    });

  });


  describe('POST /api/peliculas', () => {
    it('it should send movie to /api/peliculas POST', (done) => {
      chai.request(server)
        .post('/api/peliculas')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          nombre: "test",
          pais: "test",
          fecha_estreno: "1999/9/9",
          director: "test",
          reparto: "test"
        })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });

    it('it should return bad request', (done) => {
      chai.request(server)
        .post('/api/peliculas')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          nombre: "test",
          pais: "test",
          fecha_estreno: "1999/9/90",
          director: "test",
          reparto: "test"
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.errorCode.should.contain('bad_request');
          res.body.message.should.contain("Faltan valores requeridos, o hay valores no soportados o erroneos");
          done();
        });
    });

    it('it should return bad request', (done) => {
      chai.request(server)
        .post('/api/peliculas')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          pais: "test",
          fecha_estreno: "1999/9/9",
          director: "test",
          reparto: "test"
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.errorCode.should.contain('bad_request');
          res.body.message.should.contain("Faltan valores requeridos, o hay valores no soportados o erroneos");
          done();
        });
    });    
  });
    
    describe('PATCH /api/peliculas/:id', () => {
      it('it should update movie of the specified id', (done) => {
        chai.request(server)
          .patch('/api/peliculas/14')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({
            nombre: "test",
            pais: "test",
            director: "test",
            reparto: "test"
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.should.contain(1);
            done();
          });
      });
      
      it('it should return invalid id', (done) => {
        chai.request(server)
          .patch('/api/peliculas/1t')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({
            nombre: "test",
            pais: "test",
            director: "test",
            reparto: "test"
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.errorCode.should.contain('bad_request');
            res.body.message.should.contain('Invalid id');
            done();
          });
      });

      it('it should return invalid or missing data', (done) => {
        chai.request(server)
          .patch('/api/peliculas/10')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({
            nombre: "test",
            pais: "test",
            fecha_estreno: "1999/9/90"
          })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.errorCode.should.contain('bad_request');
            res.body.message.should.contain('Faltan valores requeridos, o hay valores no soportados o erroneos');
            done();
          });
      });

      it('it should return not found', (done) => {
        chai.request(server)
          .patch('/api/peliculas/99')
          .set('content-type', 'application/x-www-form-urlencoded')
          .send({
            nombre: "test"
          })
          .end((err, res) => {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.errorCode.should.contain('not_found');
            res.body.message.should.contain('No coincide ninguna pelicula');
            done();
          });
      });
      
    });
    describe('DELETE /api/peliculas/:id', () => {
      it('it should delete movie of the specified id', (done) => {
        chai.request(server)
          .delete('/api/peliculas/14')
          .end((err, res) => {
            res.should.have.status(204);
            done();
          });
      });

      it('it should return invalid id', (done) => {
        chai.request(server)
          .delete('/api/peliculas/1t')
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.errorCode.should.contain('bad_request');
            res.body.message.should.contain('Invalid id');
            done();
          });
      });

    });

});