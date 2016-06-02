import { Meteor } from 'meteor/meteor';

Meteor.publish('todos', function pubTodos(){
	if(!this.userId){
		return Todos.find({});
	}else{
		return Todos.find({uId:this.userId});

	}
});


Meteor.startup(() => {
  // code to run on server at startup
});
