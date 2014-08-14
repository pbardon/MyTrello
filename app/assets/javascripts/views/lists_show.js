TrelloClone.Views.ListsShow = Backbone.CompositeView.extend({
  template: JST["lists/show"],
  className: "listItem",
  events:{

  },

  initialize: function(options) {
    this.listenTo(
      this.model.cards(), "sync remove", this.render
    );

    this.listenTo(
      this.model.cards(), "add", this.addCard
    );

    var cardNewView = new TrelloClone.Views.CardsNew({ list: this.model });
    this.addSubview(".cards-new", cardNewView)

    this.model.cards().each(this.addCard.bind(this));
  },


  addCard: function(card) {
    var cardList = new TrelloClone.Collections.ListCards();
    var cardShow = new TrelloClone.Views.CardsShow({
      model: card,
      collection: cardList
    });
    cardList.add(card);
    this.addSubview(".cards", cardShow);
  },


  render: function() {
    var renderedContent = this.template({ list: this.model });
    this.$el.html(renderedContent);

    this.attachSubviews();

    this.makeSortable();

    return this;
  },





});
