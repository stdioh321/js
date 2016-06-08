Template.products.events({
	'click .remove': function(ev){
		Products.remove(this._id);
	}
});