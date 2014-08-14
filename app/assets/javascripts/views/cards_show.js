TrelloClone.Views.CardsShow = Backbone.CompositeView.extend({

  template: JST["cards/show"],
  className: "cardItem",

  events: {
    "mouseenter": "toggleDelete",
    "mouseleave": "toggleDelete",
    "click .deleteButton": "deleteCard",
    "start": "toggleDragged",
    "stop": "toggleDragged"
  },


  initialize: function (options) {

  },

  toggleDelete: function(event) {
    event.preventDefault();
    var $ct = $(event.currentTarget);
    $($ct.find('.deleteButton')).toggleClass('invisible');
  },

  toggleDragged: function(event) {
    event.preventDefault();
    var $ct = $(event.currentTarget);
    $ct.toggleClass('dragged');
  },

  deleteCard: function(event){
    cardItem = $(event.currentTarget).parent();
    this.model.destroy();
    this.collection.remove(this.model);
    cardItem.remove();

  },



  render: function() {
    var renderedContent = this.template({ card: this.model });
    this.$el.html(renderedContent);

    this.makeSortable();

    return this;
  }
});
