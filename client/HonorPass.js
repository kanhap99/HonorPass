/*
TODO:
1. Fix upvoting feature
2. Fix time
3. Testing + fix errors in cannot find property etc.
4. Designing frontend
*/
Template.main.helpers({
  'thingies': function(){
    //return list of posts sorted by vote
    return Thingies.find({},{sort:{vote:-1}});
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
    if(!this.voted && Meteor.user() != null){
      Thingies.update(this._id,
      {$set: {vote : this.vote+1}}
      );
    }

    if(this.voted == false){
      Thingies.update(this._id,
      {$set: {voted : true}}
      );
    }

  },
  'click .delete': function() {
    //only allowed to delete his/her own posts
    try {
      Meteor.call('match',this.name,this._id);
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
    Thingies.insert({
      name: Accounts.user().username || Accounts.user().profile.name,
      vote: 0,
      voted: false,
      thingie: newThingie,
      when: moment('2015-10-12').fromNow()
    });
    //clear form
    event.target.thingie.value = "";
  }
});
