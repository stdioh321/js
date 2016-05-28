import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


DB = new Mongo.Collection("db");

Meteor.methods({
	insertItem(name,email){
		DB.insert({
			name:name,
			email:email
		});
	},
	checked(rec){
		DB.update(rec._id, {$set:{checked: !rec.checked}});
	},
	removeItem(rec){
		console.log(rec);
		DB.remove(rec._id);
	}
});