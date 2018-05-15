import Track from '../models/Track'

const Tracks = Backbone.Collection.extend({
  model: Track,

  url: '/api/files',

  parse: function (data) {
    return data['results']
  }
})

export default Tracks
