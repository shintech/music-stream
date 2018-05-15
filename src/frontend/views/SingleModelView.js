const SingleModelView = Backbone.Marionette.View.extend({
  tagName: 'div',

  className: 'modal fade hidden',

  template: require('../templates/single-model-view-template.html'),

  id: 'single-model-view',

  events: {
    'click .close': 'handleClick'
  },

  initialize: function () {
    const view = this

    window.onclick = function (event) {
      if (event.target.className === 'modal') {
        view.destroy()
      }
    }
  },

  handleClick: function () {
    this.destroy()
  }
})

export default SingleModelView
