import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import '../imports/api/tasks.js';

resolution = new Mongo.Collection("resolution");

resolution.insert({
	title : "First Resolution",
	createdAt: new Date()
});

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.publish("db", function(){
  	return DB.find(); 
  })

});

  