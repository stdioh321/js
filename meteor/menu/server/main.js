import { Meteor } from 'meteor/meteor';

Meteor.publish('recipes', function(){
	return Recipes.find({
		
	});
});

Meteor.startup(() => {
  // code to run on server at startup
});
