Template.posts.helpers({
	DB(){
		return Posts.find({}, {sort: {createdAt: -1}});
	}
});

Template.posts.events({
	'click .posts-show .remove': function(ev){
		if(isMine(this.userId))
			Posts.remove({_id:this._id});
	}
});