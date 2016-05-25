import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';

// import 'bootstrap/dist/css/bootstrap.css';
import 'importTest.js';
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
            return DB.find();
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
    "click .tb-data a": function(ev){
        DB.remove(this._id);
        return false;
    },
    "change .item-check" : function(ev){
        DB.update(this._id, {$set: {checked: !this.checked}});
    }
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
