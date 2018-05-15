export default function (response, options) {
  return {
    'Content-Length': Buffer.byteLength(JSON.stringify(response), 'utf-8'),
    'Content-Type': 'application/json',
    'X-Response-Time': Date.now() - options.startTime
  }
}
