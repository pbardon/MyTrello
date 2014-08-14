TrelloClone.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST['boards/index'],
  tagName: 'ul',

  initialize: function() {
    this.listenTo(this.collection, 'add sync remove', this.render)


    var boardNewView = new TrelloClone.Views.NewBoard({});
    this.addSubview(".boards-new", boardNewView);

  },

  render: function() {
    var view = this;
    view.$el.html(view.template({
      boards: view.collection
    }));

    this.attachSubviews();

    return this;
  }
});
