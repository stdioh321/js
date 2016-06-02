import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';


Meteor.subscribe('recipes');

Template.home.helpers({
    testDB() {
        return Recipes.find({}, { sort: { name: -1 } });
    },
    dbHasData() {
        return (Recipes.find().count() > 0);
    },
    sameUser() {
        return this.author == Meteor.userId();
    },
    getUser() {
        return Recipes.find(this.author);
    }


});

Template.home.events({
    'click .remove': function(ev) {
        //console.log(this);
        Recipes.remove(this._id);
    }
});


Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
});