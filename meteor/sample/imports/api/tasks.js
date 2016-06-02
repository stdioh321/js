import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';


DB = new Mongo.Collection("db");

function isLogged(){
	if(Meteor.userId() == null){
		throw new Error("Não logado.");
		return false;
	}
}

Meteor.methods({
	insertItem(name,email){
		isLogged();
		DB.insert({
			name:name,
			email:email,
			owner: Meteor.userId(),
			createdAt: Date.now()
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