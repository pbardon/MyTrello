Backbone.CompositeView = Backbone.View.extend({
  addSubview: function (selector, subview) {
    this.subviews(selector).push(subview);
    // Try to attach the subview. Render it as a convenience.
    this.attachSubview(selector, subview.render());
  },

  attachSubview: function (selector, subview) {
    this.$(selector).append(subview.$el);
    // Bind events in case `subview` has previously been removed from
    // DOM.
    subview.delegateEvents();
  },

  attachSubviews: function () {
    // I decided I didn't want a function that renders ALL the
    // subviews together. Instead, I think:
    //
    // * The user of CompositeView should explicitly render the
    //   subview themself when they build the subview object.
    // * The subview should listenTo relevant events and re-render
    //   itself.
    //
    // All that is necessary is "attaching" the subview `$el`s to the
    // relevant points in the parent CompositeView.

    var view = this;
    _(this.subviews()).each(function (subviews, selector) {
      view.$(selector).empty();
      _(subviews).each(function (subview) {
        view.attachSubview(selector, subview);
      });
    });
  },

  delegateEvents: function(){
      var view = this;
      _(this.subviews()).each(function (subviews, selector) {
        _(subviews).each(function (subview) {
          subview.delegateEvents();
        });
      });
      Backbone.View.prototype.delegateEvents.call(this);
  },

  makeSortable: function() {

    $('.lists').sortable({
      start: function(event, ui) {
        $(ui.item).toggleClass('draggedList');
      },
      stop: function(event, ui) {
        $(ui.item).toggleClass('draggedList');
      },
      update: function( event, ui ) {
        _(ui.item.parent().children()).each(function(list, index) {
          var id = $($(list).children()).data('id');
          var curList = TrelloClone.Collections.boards.findWhere({id: $('.board_show').data('id')}).lists().findWhere({'id': id});
          curList.set('ord', index);
          curList.save();
        });
      }
    });

    $('.cards').sortable({
      connectWith: '.cards',
      start: function(event, ui) {
        $(ui.item).toggleClass('draggedCard');
      },
      stop: function(event, ui) {
        $(ui.item).toggleClass('draggedCard');

      }
      //
      // update: function (event, ui ) {
      //   _(ui.item.parent().children()).each(function(card, index){
      //     var id = $($(card).children()).data('id');
      //     var listId = ui.item.parent().parent().data('id');
      //     var curCard = TrelloClone.Collections.boards.findWhere({id: $('.board_show').data('id')}).lists().findWhere({id: listId})findWhere({id: $('.cards').data('id')}).findWhere({'id': id});
      //
      //   });
      //
      //
      // }
    });

  },


  remove: function () {
    Backbone.View.prototype.remove.call(this);
    _(this.subviews()).each(function (subviews) {
      _(subviews).each(function (subview) {
        subview.remove();
      });
    });
  },

  removeSubview: function (selector, subview) {
    subview.remove();

    var subviews = this.subviews(selector);
    subviews.splice(subviews.indexOf(subview), 1);
  },

  subviews: function (selector) {
    // Map of selectors to subviews that live inside that selector.
    // Optionally pass a selector and I'll initialize/return an array
    // of subviews for the sel.
    this._subviews = this._subviews || {};

    if (!selector) {
      return this._subviews;
    } else {
      this._subviews[selector] = this._subviews[selector] || [];
      return this._subviews[selector];
    }
  }
});
