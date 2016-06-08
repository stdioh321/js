Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function(){
	//Home Routes
	this.route('home',{
		path: '/',
		template: 'home'
	});
});