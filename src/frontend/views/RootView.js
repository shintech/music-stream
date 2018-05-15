const RootView = Backbone.Marionette.View.extend({
  className: 'root',
  template: require('../templates/root-view-template.html'),
  regions: {
    content: {
      el: '.content'
    },
    modal: {
      el: '.root-modal'
    }
  }
})

export default RootView
