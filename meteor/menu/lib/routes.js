FlowRouter.route('/',{
	name: "main",
	action(){
		BlazeLayout.render('mainLayout', {main: "home"});
	}
});

FlowRouter.route('/recipes-book',{
	name: "recipes-book",
	action(){
		BlazeLayout.render('mainLayout', {main: "Recipes"});
	}
});