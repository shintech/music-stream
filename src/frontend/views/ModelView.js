const ModelView = Backbone.Marionette.View.extend({
  initialize: function (options) {
    this.app = options.app
  },

  tagName: 'li',

  template: require('../templates/model-view-template.html'),

  events: {
    'click .click': 'handleClick'
  },

  handleClick: function (e) {
    e.preventDefault()
    this.app.view.triggerMethod('modal:trigger', this.model)
  }
})

export default ModelView
