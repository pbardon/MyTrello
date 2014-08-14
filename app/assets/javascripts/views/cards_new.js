TrelloClone.Views.CardsNew = Backbone.View.extend({
  template: JST["cards/new"],
  events:{
    "click .addNewCard": "addNewCard"
  },
  initialize: function(options) {
    this.list = options.list;
  },

  render: function(){
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    return this;
  },

  addNewCard: function (event) {
    var view = this;
    event.preventDefault();
    var $form = $($(event.currentTarget).parent());
    var params = $form.serializeJSON();
    params.card.list_id = this.list.id;
    var card = new TrelloClone.Models.Card(params.card);
    card.save({}, {

      success: function() {
        view.list.cards().add(card);
        $('.title').val("");
        $('.description').val("");
      }
    });
  },
})
