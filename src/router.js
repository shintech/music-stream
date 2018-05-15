import {Router} from 'express'
import {home, files} from './routes'

const router = Router()

export default function (options) {
  router.route('/home')
    .get(home(options).home)

  router.route('/files')
    .get(files(options).read.all)

  router.route('/files/:id')
    .get(files(options).read.one)
  return router
}
