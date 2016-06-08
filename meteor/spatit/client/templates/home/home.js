Template.home.events({
    'click .flash': function(ev) {

        FlashMessages.sendInfo("You can found <strong>Meteor</strong> <a href='http://meteor.com'>here</a>");

    }
});
Template.home.helpers({
    productsDB(){
        return Products.find({is_featured: true}, {sort: {createdAt: -1}});
    },
    fsImg(){
    	return ProductImages.find({});
    }
});