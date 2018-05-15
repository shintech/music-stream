import _create from './create'
import _read from './read'
import _update from './update'
import _destroy from './destroy'

export default function (options) {
  return {
    create: _create(options),
    read: _read(options),
    update: _update(options),
    destroy: _destroy(options)
  }
}
