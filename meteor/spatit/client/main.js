import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';


Meteor.subscribe('productis');
Meteor.subscribe('categories');

FlashMessages.configure({
    autoHide: true,
    hideDelay: 3000,
    autoScroll: true
});


Template.registerHelper('getAvg', function(reviews) {
    var tot = 0;
    var leng = 0;

    if(!reviews){
    	return 0;
    }
    if (reviews.length != null || reviews.length != undefined) {
        lang = reviews.length;
    }
    reviews.forEach(function(el, index) {
        tot += parseInt(el.rating);
    });
    tot = tot / leng;
    return tot.toFixed(1);
});
Template.registerHelper('currentRoute', function(route) {
    	route= '/categories/' + route;
    	
    if (Router.current().originalUrl == route) {
        return true;
    } else {
        return false;
    }

});

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
});