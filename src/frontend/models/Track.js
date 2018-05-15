const Track = Backbone.Model.extend({
  events: {
    'click': 'handleClick'
  },

  initialize: function () {
    this.urlRoot = `/public/files/${this.get('filename')}`
  },

  parse: function (data) {
    const object = {
      filename: data
    }

    return object
  },
  handleClick: function (e) {
    e.preventDefault()
    console.log('clicked')
    return false
  }
})

export default Track
