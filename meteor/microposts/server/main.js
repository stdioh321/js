import { Meteor } from 'meteor/meteor';

Meteor.publish('posts', function(){
	return Posts.find();
});
Meteor.publish('ProfileImages', function(){
	return ProfileImages.find();
});
Meteor.publish('UserImages', function(){
	return UserImages.find();
});

Meteor.startup(() => {
  // code to run on server at startup
});
