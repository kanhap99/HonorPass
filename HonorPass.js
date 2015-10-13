/*
TODO:
1. Upvoting feature
2. Ranking feature
3. Testing
4. Designing frontend
*/
if (Meteor.isClient) {
  Template.main.helpers({
    'thingies': function(){
      return Thingies.find();
    }
  });
  Template.add.events({
    'submit form': function(event) {
      event.preventDefault();
      var newThingie = event.target.thingie.value;
      console.log(newThingie);
      Thingies.insert({
        vote: 0,
        name: Accounts.user().profile.name,
        thingie: newThingie,
        when: moment(this.date).fromNow()
      });
    }
  });
}
