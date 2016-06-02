// Template.profile.onCreated(function(){
// 	this.infImg = new ReactiveVar(); 	
// });

// Template.profile.helpers({
// 	infImg(){
// 		return Template.instance().infImg.get();
// 	}
// });
Template.profile.events({
    //   'change #upFile': function(ev) {
    //       file = ev.target.files[0];
    //     	if(file){
    //     		fsFile = new FS.File(file);
    //     		console.log(fsFile);

    //     	}  
    // return false;
    //   },
    'submit .formUpImage': function(ev) {
        file = $('#upFile').get(0).files[0];
        if (file) {
        	fsFile = new FS.File(file);
            console.log(fsFile);
            ProfileImages.insert(fsFile, function(err, result) {
                if (err) {
                    throw new Meteor.Error(err);
                } else {
                	window.res = result;
                    var imgLoc = "/cfs/files/ProfileImages/" + result._id;
                    if (UserImages.find({ userId: Meteor.userId() }).fetch().length > 0) {

                    } else {
							 UserImages.insert({
                            userId: Meteor.userId(),
                            username: Meteor.user().usermame,
                            image: imgLoc
                        });
                    }

                    Router.go("/");
                }
            });
        }
        return false;
    }
});