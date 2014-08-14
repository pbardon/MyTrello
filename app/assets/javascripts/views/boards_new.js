TrelloClone.Views.NewBoard = Backbone.View.extend({
  template: JST['boards/new'],

  events: {
    "submit #form-new": "submit"
  },

  render: function() {
    var renderedContent = this.template({})
    this.$el.html(renderedContent)
    return this;
  },

  submit: function(event) {
    event.preventDefault();

    var params = $(event.currentTarget).serializeJSON();
    var newBoard = new TrelloClone.Models.Board(params["board"]);

    newBoard.save({}, {
      success: function () {
        TrelloClone.Collections.boards.add(newBoard);
        Backbone.history.navigate("/boards/" + newBoard.id, {trigger: true});
      }
    });
  }
});
