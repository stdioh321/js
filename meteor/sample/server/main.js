import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import '../imports/api/tasks.js';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.publish("db", function(){
  	return DB.find(); 
  })

});





