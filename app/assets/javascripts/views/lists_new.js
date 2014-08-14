TrelloClone.Views.ListsNew = Backbone.View.extend({
  template: JST["lists/new"],

  events: {
    "click .addList": "submit"
  },

  submit: function (event) {
    var view = this;
    event.preventDefault();
    var params = $($(event.target).parent()).serializeJSON();
    params.list.board_id = this.model.id;
    params.list.ord = this.model.lists().length - 1;
    var list = new TrelloClone.Models.List(params.list);
    list.save({}, {

      success: function() {
        view.model.lists().add(list);
        view.render();
      }
    });
  },

  render: function () {
    var renderedContent = this.template();

    this.$el.html(renderedContent);

    return this;
  }

});
