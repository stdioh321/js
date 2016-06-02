import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

Meteor.subscribe('posts');
Meteor.subscribe('ProfileImages');
Meteor.subscribe('UserImages');

isMine = function(id){
  return id == Meteor.userId();
}

Meteor.startup(function () {
    AccountsEntry.config({
      dashboardRoute: '/',
      homeRoute: "/",
      passwordSignupFields:"USERNAME_AND_EMAIL",
      waitEmailVerification: false,
      extraSignUpFields: [{                      
        field: "name",                           
        name: "",								 
        label: "Name",                      
        placeholder: "John",                
        type: "text",                       
        required: true                     
       }]
    });
  });

Template.registerHelper('getProfileImg', function(userId){
	tmpImg = UserImages.findOne({userId: userId});
  if(tmpImg){
    return tmpImg.image;
  }else{
    return null;
  }
});
Template.registerHelper('getUserId', function(userId){
  return Meteor.userId();
});

Template.registerHelper('isMine', function(id){
  return id == Meteor.userId();
});


Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
});

