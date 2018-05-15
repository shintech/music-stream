import { headers } from '../../lib'

export default function (options) {
  const { db, logger } = options

  return async function (req, res) {
    const modelId = parseInt(req.params.id)

    let result, message, status, response
    options.startTime = Date.now()

    try {
      result = await db.one('update models set first_name=$1, last_name=$2, email=$3, optional=$4 where id=$5 returning id, first_name, last_name, email, optional', [req.body.first_name, req.body.last_name, req.body.email, req.body.optional, modelId])
      status = 'success'
      message = `Updated model id: ${result.id}...`
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
