Meteor.methods({
  'match': function(name,id){
    try {
      if(name === Accounts.user().username || name === Accounts.user().profile.name)
        Thingies.remove(id);
    } catch(err) {
      console.log("Ignore " + err);
    }
  }
});
