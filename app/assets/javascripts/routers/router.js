TrelloClone.Routers.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options['$rootEl'];
  },

  routes: {
    "": "boardsIndex",
    "boards/new": "newBoard",
    "boards/:id": "showBoard"
  },

  boardsIndex: function() {
    TrelloClone.Collections.boards.fetch();
    var indexView = new TrelloClone.Views.BoardsIndex({
      collection: TrelloClone.Collections.boards
    });

    this._swapView(indexView);
  },

  newBoard: function() {
    var newView = new TrelloClone.Views.NewBoard();
    this._swapView(newView);
  },

  showBoard: function(id) {
    var board = TrelloClone.Collections.boards.getOrFetch(id)
    var showBoardView = new TrelloClone.Views.BoardShow({
      model: board
    });

    this._swapView(showBoardView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
