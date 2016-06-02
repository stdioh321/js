Todos = new Mongo.Collection('todos');
//Users = new Mongo.Collection('users');

Todos.allow({
	insert(userId, doc){
		return !!userId;
	},
	remove(userId, doc){
		return !!userId;
	},
	update(userId, doc){
		return !!userId;
	}
});

TodosSchema = new SimpleSchema({
	name:{
		type: String,
		label: "Name"

	},
	desc:{
		type: String,
		label: "Description",
		optional: true
	},
	email:{
		type: String,
		label: "Email"
	},
	favNum:{
		type: Number,
		label: "Favorite Number",
		optional: true
	},
	uId:{
		type: String,
		label: "UserId"
	},
	checked:{
		type: Boolean,
		label: "checked",
		optional: true,
		autoValue: function() {
	      if (this.isInsert) {
	        return false;
	      } 
		}
		// ,autoValue:function(){
		// 	return false;
		// }
	},
	createdAt:{
		type: Date,
		label: "Created At",
		autoValue: function(){
			return new Date();
		}
	}
});

Todos.attachSchema(TodosSchema);

/*
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
*/