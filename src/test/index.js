import chai from 'chai'
import chaiHttp from 'chai-http'
const path = require('path')
const logger = require('winston')
require('babel-polyfill')

chai.use(chaiHttp)

const expect = chai.expect
const environment = process.env['NODE_ENV'] || 'development'

const options = {
  basedir: path.join(__dirname, '../../'),
  environment: environment,
  pkg: require(path.join(__dirname, '../../package.json')),
  logger: logger,
  port: process.env['PORT'] || 8000,
  postgresURI: process.env['POSTGRES_URI'] || `postgres://postgres:postgres@localhost:5432/api_${environment}`
}

const application = require('../../dist')

application.start(options, (server, db) => {
  describe('Models', () => {
    before(async function () {
      try {
        await db.none('truncate models restart identity')
      } catch (err) {
        console.log(err)
      }
    })

    beforeEach(async function () {
      try {
        await db.none('insert into models( first_name, last_name, email, optional)' + 'values($1, $2, $3, $4)', ['first_name', 'last_name', 'email@example.com', 'option1'])
      } catch (err) {
        console.log(err)
      }
    })

    afterEach(async function () {
      try {
        await db.none('truncate models restart identity')
      } catch (err) {
        console.log(err)
      }
    })

    /*eslint-disable */
    it('GET /api/models -> should get all models', done => {
      chai.request(server)
        .get('/api/models')
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res).to.be.json
          expect(res.body.results[0]).to.have.property('id')
          done()
        })
    })

    it('GET /api/models/:id -> should get a single model', done => {
      chai.request(server)
        .get('/api/models')
        .end((error, response) => {
          expect(error).to.be.null
          chai.request(server)
            .get(`/api/models/${response.body.results[0].id}`)
            .end((err, res) => {
              expect(err).to.be.null
              expect(res).to.have.status(200)
              expect(res).to.be.json

              expect(res.body.result).to.have.property('id')
              expect(res.body.result).to.have.property('first_name')
              expect(res.body.result).to.have.property('last_name')
              expect(res.body.result).to.have.property('email')
              expect(res.body.result).to.have.property('optional')
              expect(res.body.result).to.have.property('created_at')

              expect(res.body.result['first_name']).to.equal('first_name')
              expect(res.body.result['last_name']).to.equal('last_name')
              expect(res.body.result['email']).to.equal('email@example.com')
              expect(res.body.result['optional']).to.equal('option1')

              done()
            })
        })
    })

    it('POST /api/models -> should create a single model', done => {
      chai.request(server)
        .post('/api/models')
        .send({
          first_name: 'new',
          last_name: 'model',
          email: 'newModel@example.com',
          optional: 'option2'
        })
        .end((err, res) => {
          expect(err).to.be.null
          expect(res).to.have.status(200)
          expect(res).to.be.json
          done()
        })
    })

    it('PUT /api/models/:id -> should update a single model', done => {
      chai.request(server)
        .get('/api/models')
        .end((error, response) => {
          expect(error).to.be.null
          chai.request(server)
            .put(`/api/models/${response.body.results[0].id}`)
            .send({
              first_name: 'newFirstName',
              last_name: 'newLastName',
              email: 'newEmail@exapmle.com',
              optional: 'option3'
            })
            .end((err, res) => {
              expect(err).to.be.null
              expect(res).to.have.status(200)
              expect(res).to.be.json
              chai.request(server)
                .get('/api/models')
                .end((e, r) => {
                  expect(e).to.be.null
                  expect(r.body.results[0]).to.have.property('id')
                  expect(r.body.results[0]).to.have.property('first_name')
                  expect(r.body.results[0]).to.have.property('last_name')
                  expect(r.body.results[0]).to.have.property('email')
                  expect(r.body.results[0]).to.have.property('optional')
                  expect(r.body.results[0]).to.have.property('created_at')

                  expect(r.body.results[0]['first_name']).to.equal('newFirstName')
                  expect(r.body.results[0]['last_name']).to.equal('newLastName')
                  expect(r.body.results[0]['email']).to.equal('newEmail@exapmle.com')
                  expect(r.body.results[0]['optional']).to.equal('option3')

                  done()
                })
            })
        })
    })

    it('DELETE /api/models/:id -> should delete one model', done => {
      chai.request(server)
        .get('/api/models')
        .end((error, response) => {
          expect(error).to.be.null
          chai.request(server)
            .delete(`/api/models/${response.body.results[0].id}`)
            .end((err, res) => {
              expect(err).to.be.null
              expect(res).to.have.status(200)
              expect(res).to.be.json
              done()
            })
        })
    })
    
  /* eslint-enable */
  })
})
