const path = require('path')
const logger = require('winston')
require('babel-polyfill')

const environment = process.env['NODE_ENV'] || 'development'

const options = {
  basedir: __dirname,
  environment: environment,
  pkg: require(path.join(__dirname, 'package.json')),
  logger: logger,
  port: process.env['PORT'] || 8000,
  postgresURI: process.env['POSTGRES_URI'] || `postgres://postgres:postgres@localhost:5432/api_${environment}`
}

const application = require(path.join(__dirname, 'dist'))

application.start(options)
  .then(server => {
    server.listen(options.port)
  })
  .catch(err => {
    logger.error(err)
  })
