import { Meteor } from 'meteor/meteor';

Meteor.publish('questions', function(){
	return Questions.find({});
});
Meteor.startup(() => {
  // code to run on server at startup
});
