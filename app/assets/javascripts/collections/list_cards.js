TrelloClone.Collections.ListCards = Backbone.Collection.extend({
  model: TrelloClone.Models.Card,
  url: 'api/cards',

  comparator: 'ord'
});
