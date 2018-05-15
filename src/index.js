import configApp from './app'
import configServer from './server'
import configRouter from './router'
import configDB from './db'

export function start (options, callback) {
  const app = configApp(options)
  const server = configServer(app, options)
  options.db = configDB(options)
  const router = configRouter(options)

  const { environment } = options

  app.use('/api', router)

  app.get('/', (req, res) => {
    let message = `${res.statusCode}: Success...`

    res.status(200)
      .render('index', {
        title: 'Success',
        heading: 'Success',
        url: req.url,
        status: res.statusCode,
        message: message
      })
  })

  app.use(function (req, res) {
    res.status(400)
      .format({
        json: () => {
          res.send({
            url: req.url,
            status: res.statusCode,
            message: `${res.statusCode}: Not found...`
          })
        },

        html: () => {
          res.render('error', {
            title: 'Error',
            heading: 'Error',
            url: req.url,
            status: res.statusCode,
            message: `${res.statusCode}: Not found...`
          })
        }
      })
  })

  if (environment === 'test') {
    return callback(server, options.db)
  } else {
    return Promise.resolve(server)
  }
}
