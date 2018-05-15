import Model from '../models/Model'

const FormView = Backbone.Marionette.View.extend({
  template: require('../templates/form-view-template.html'),

  tagName: 'form',

  className: 'content-view',

  events: {
    'click button': 'handleClick'
  },

  handleClick: function (e) {
    e.preventDefault()

    let model = new Model()

    const modelAttrs = {
      first_name: $('[name="first_name"]').val(),
      last_name: $('[name="last_name"]').val(),
      email: $('[name="email"]').val(),
      message: $('[name="message"]').val(),
      optional: $('[name="optional"]').val()
    }

    model.set(modelAttrs)

    model.save(modelAttrs, {
      success: () => {
        console.log('success')
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
})

export default FormView
