

Router.configure({
	layoutTemplate: 'layout'
});

Router.map(function(){
	//Home Routes
	this.route('questions',{
		path: '/',
		template: 'questions'
	});
});