Router.configure({
	layoutTemplate: "layout"
});

Router.map(function(){
	// Posts Route
	this.route('posts',{
		path: "/",
		template: "posts"
	});
	this.route('profile',{
		path: "/profile",
		template: "profile"
	});
	this.route('about',{
		path: "/about",
		template: "about"
	});
});