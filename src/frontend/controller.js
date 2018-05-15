import Marionette from 'marionette'
import Tracks from './collections/Tracks'
import ModelsView from './views/ModelsView'
import TrackView from './views/TrackView'

const Controller = Marionette.Object.extend({
  initialize: function (options) {
    this.app = options
    this.app.tracks = new Tracks()
  },

  index: async function () {
    let app = this.app
    let tracks

    try {
      tracks = await app.lookup(app.tracks)
    } catch (err) {
      console.error(err.message)
    }

    let tracksView = new ModelsView({ app: app, collection: tracks })

    app.view.showChildView('content', tracksView)

    app.view.on('modal:trigger', (track) => {
      app.view.showChildView('modal', new TrackView({ model: track }))
    })
  }
})

export default Controller
