import ModelView from './ModelView'

const ModelsView = Backbone.Marionette.CollectionView.extend({
  initialize: function (options) {
    this.options = options
  },

  className: 'content-view',

  tagName: 'ul',

  childView: ModelView,

  childViewOptions: function () {
    return this.options
  }
})

export default ModelsView
