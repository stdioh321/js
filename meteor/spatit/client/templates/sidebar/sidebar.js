Template.sidebar.helpers({
	DB(){
		return Categories.find({},{
			sort: {name: 1}
		});
	}
});

Template.sidebar.events({
	'click .remove': function(ev){
		Categories.remove(this._id);
	}
});