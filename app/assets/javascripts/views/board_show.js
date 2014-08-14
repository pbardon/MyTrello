TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST["boards/show"],

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(
      this.model.lists(), "add", this.addList
    );


    var listNewView = new TrelloClone.Views.ListsNew({ model: this.model });
    this.addSubview(".lists-new", listNewView);


    this.model.lists().each(this.addList.bind(this));

  },

  events: {
    "click .confirm": "deleteBoard"
  },

  addList: function(list) {
    var listShow = new TrelloClone.Views.ListsShow({
      model: list
    });
    this.addSubview(".lists", listShow);
  },


  deleteBoard: function(event) {
    event.preventDefault();
    TrelloClone.Collections.boards.remove(this.model);
    this.model.destroy();
    this.remove();
    Backbone.history.navigate("/", { trigger: true });
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  },

  render: function() {
    var renderedContent = this.template({
      board: this.model
    });

    this.$el.html(renderedContent);

    this.attachSubviews();

    this.makeSortable();

    return this;
  }
});
