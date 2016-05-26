import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';
import { Session } from 'meteor/session';
// import 'bootstrap/dist/css/bootstrap.css';

import './main.html';



import { DB } from "../imports/api/tasks.js";


//
//Template.hello.onCreated(function helloOnCreated() {
//  // counter starts at 0
//  this.counter = new ReactiveVar(0);
//});

Template.body.onCreated(function bodyOnCreated(){
}); 

Template.body.helpers({

    "test": function(){
            return [{id:1, name:"Carlos"}];
        }
    ,"testDB": function(){
        sort = {sort:{name : 0}}
        if(Session.get("hideCheck")){
            return DB.find({checked:{$ne:true}}, sort);
        }else{
            return DB.find({},sort);
        }
    },
    hideCheck(){
        return Session.get("hideCheck");
    },
    testDB2(){
        return DB.find({checked:{$ne:true}});
        // if(Session.get("hideCheck")){
        // }else{
        //     return DB.find()
        // }
    },tmpVal(){
        return Session.get("hideCheck");
    }
});
    
Template.body.events({
    "submit .new-task" : function(ev){
        
        DB.insert({
            name: ev.target.name.value,
            email: ev.target.email.value
        });
        ev.target.name.value = "";
        ev.target.email.value = "";
        return false;
    },
    "click .tb-data .remove": function(ev){
        DB.remove(this._id);
        return false;
    },
    "change .item-check" : function(ev){
        console.log(ev);
        DB.update(this._id, {$set: {checked: !this.checked}});
    },
    "change .hideCheck": function(ev){
        console.log(ev);
        tmp = false
        if (ev.target.checked) {
            tmp = true;
        }

        Session.set("hideCheck", tmp);
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
