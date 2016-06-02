import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { Session } from 'meteor/session';


import './main.html';

DB = new Mongo.Collection("db");


Meteor.subscribe("db");
window.m = Meteor;

//
//Template.hello.onCreated(function helloOnCreated() {
//  // counter starts at 0
//  this.counter = new ReactiveVar(0);
//});

Template.body.onCreated(function bodyOnCreated(){

}); 

Template.body.helpers({

    "test": function(){
            
    }
    ,"testDB": function(){
        return DB.find();
    }
});
Template.iterarDB.helpers({
    isOwner(){
        return this.owner == Meteor.userId();
    }
});
   
Template.formLogin.events({
    "submit .new-task" : function(ev){
        var name  = ev.target.name.value;
        var email  = ev.target.email.value;
        
        Meteor.call("insertItem", name, email);

        ev.target.email.value = "";
        ev.target.name.value = "";
        
        
       return false;
    }
});    
Template.body.events({
    
    "click .tb-data .remove": function(ev){
        if(confirm("Certeza?")){
            Meteor.call("removeItem", this);
        }
    },
    "change .item-check" : function(ev){
        Meteor.call("checked", this);

    },
    "change .hideCheck": function(ev){

    }
});

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
});
//Template.hello.helpers({
//  counter() {
//    return Template.instance().counter.get();
//  },
//});

//Template.hello.events({
//  'click button'(event, instance) {
//    // increment the counter when button is clicked
//    instance.counter.set(instance.counter.get() + 1);
//  },
//});
