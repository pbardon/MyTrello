TrelloClone.Models.Card = Backbone.Model.extend({
  urlRoot: 'api/cards',
  
  validate: function(attributes){
    if(!attributes || !attributes.title || !attributes.description) {
      return "cannot have no title or description";
    }else if(attributes.desription === "" || attributes.title === "") {
      return "cannot have blank title or description";
    }
  }
})
