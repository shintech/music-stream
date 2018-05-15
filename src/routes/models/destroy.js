import { headers } from '../../lib'

export default function (options) {
  const { db, logger } = options

  return async function (req, res) {
    const modelId = parseInt(req.params.id)

    let result, status, message, response
    options.startTime = Date.now()

    try {
      result = await db.one('delete from models where id = $1 returning id', modelId)
      status = 'success'
      message = `Removed model id: ${result.id}...`
    } catch (err) {
      status = 'error'
      message = err.message

      logger.error(err.message)
    }

    response = { result, status, message }

    res.status(200)
      .format({
        json: () => {
          res.set(headers(response, options))
            .write(JSON.stringify(response))

          res.end()
        }
      })
  }
}
