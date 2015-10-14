/*
TODO:
date thingies still not fully complete; focus on that later.
3. Fix upvoting feature
3. Testing + fix errors in cannot find property etc.
4. Move onto designing frontend
*/


Template.main.helpers({
  'thingies': function(){
    //return list of posts sorted by vote
    return Thingies.find({},{sort:{vote:-1}})
  },
  'yours' : function (){
    try{
      if(this.name === Accounts.user().username || this.name === Accounts.user().profile.name)
        return true;
      return false;
    }catch(err){
      console.log(err);
    }
  }
});
Template.main.events({
  //'this' in this context refers to the current thingie
  'click .vote': function (event) {
    event.preventDefault();
    if(Meteor.user() != null){
      Meteor.call('updateVote',this._id,this.vote);
    }
  },
  'click .delete': function() {
    //only allowed to delete his/her own posts
    try {
      Meteor.call('remove',this.name,this._id);
    } catch(err) {
      console.log("Ignore " + err);
    }
  }
});

Template.add.events({
  'submit form': function(event) {
    //prevent defualt submitting of form
    event.preventDefault();
    var newThingie = event.target.thingie.value;
    Meteor.call('insertData',newThingie);
    //clear form
    event.target.thingie.value = "";
  }
});
