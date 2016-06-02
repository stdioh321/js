Recipes = new Meteor.Collection('recipes');


Recipes.allow({
	insert: function(userId, doc){
		return !!userId;
	},
	remove: function(userId, doc){
		return doc.author == userId;

		
	},
	update: function(userId, doc){
		console.log(userId);
		return !!userId;
		
	}
});

RecipesSchema = new SimpleSchema({
	name: {
		type: String,
		label: "Name"
	},
	desc: {
		type: String,
		label: "Description"
	},
	author: {
		type: String,
		label: "Author",
		autoValue: function(){
			console.log(this);
			return this.userId;
		},
		autoform: {
			type: "hidden"
		}
	},
	createdAt:{
		type: Date,
		label: "Created At",
		autoValue: function(){
			return new Date();
		},
		autoform: {
			type: "hidden"
		}
	}
});

Recipes.attachSchema(RecipesSchema);