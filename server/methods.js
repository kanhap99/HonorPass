//all my beautiful methods that belong to me
Meteor.methods({
  'updateVote' : function(id,currentVote) {
    Thingies.update(id,
    {$set: {vote : currentVote+1}}
    );
  },
  'remove': function(name,id){
    try {
      if(name === Accounts.user().username || name === Accounts.user().profile.name)
        Thingies.remove(id);
    } catch(err) {
      console.log("Ignore " + err);
    }
  },
  'insertData' : function(thingie) {
    Thingies.insert({
      name: Accounts.user().username || Accounts.user().profile.name,
      vote: 0,
      thingie: thingie,
    });
  }
});
