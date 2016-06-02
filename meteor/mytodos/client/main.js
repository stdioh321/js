import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
//import { Session } from 'meteor/session';

// Template.hello.onCreated(function helloOnCreated() {
//   // counter starts at 0
//   this.counter = new ReactiveVar(0);
// });

// Template.hello.helpers({
//   counter() {
//     return Template.instance().counter.get();
//   },
// });

// Template.hello.events({
//   'click button'(event, instance) {
//     // increment the counter when button is clicked
//     instance.counter.set(instance.counter.get() + 1);
//   },
// });


Meteor.subscribe('todos');
Meteor.testUser = "testUser";




Template.viewData.helpers({
	todosDB(){
		return Todos.find({}, {sort: {name: 0}});
	},
	convertDate(){
		tmpD = this.createdAt;
		d = tmpD.getDate() + "/"+tmpD.getMonth()+"/"+tmpD.getFullYear();
		return d;
	}
});
Template.body.events({
	'click .remove': function(ev){
		Todos.remove(this._id);
	},
	'change .check':function(ev){
		Todos.update(this._id, {$set: {checked:!this.checked}});
	},
	'submit form': function(ev){
		name = ev.target.name;
		email = ev.target.email;
		
		
		upObj = {
			name: ev.target.name.value,
			email: email.value,
			uId: Meteor.userId()
		}
		
		Todos.insert(upObj);

		ev.target.name.value = "";
		ev.target.email.value = "";
		
		ev.target.name.focus();
		return false;
	}
});

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
});