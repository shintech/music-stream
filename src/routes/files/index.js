import _read from './read'

export default function (options) {
  return {
    read: _read(options)
  }
}
