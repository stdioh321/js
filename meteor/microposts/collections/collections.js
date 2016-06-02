ProfileImages = new FS.Collection("ProfileImages", {
    stores: [new FS.Store.GridFS("ProfileImages")]
});
ProfileImages.allow({
    insert: function(userId, doc) {
        return !!userId;
    },
    update: function(userId, doc) {
        return !!userId;
    },
    remove: function(userId, doc) {
        return !!userId;
    },
    download: function(userId, doc) {
        return true;
    }



});

UserImages = new Mongo.Collection("UserImages");
UserImages.allow({
    insert: function(userId, doc) {
        return !!userId;
    }

});



Posts = new Mongo.Collection("posts");

Posts.attachSchema(new SimpleSchema({
    body: {
        type: String,
        label: "Body",
        max: 500

    },
    userId: {
        type: String,
        label: "UserId",
        autoValue: function() {
            return this.userId;
        },
        autoform: {
            type: "hidden"
        }
    },
    username: {
        type: String,
        label: "Username",
        autoValue: function() {
            return Meteor.user().username;
        },
        autoform: {
            type: 'hidden'
        }
    },
    createdAt: {
        type: Date,
        label: "Created At",
        autoValue: function() {
            return new Date();
        },
        autoform: {
            type: "hidden"
        }
    }

}));


Posts.allow({
    insert: function(userId, doc) {
        return !!userId;
    },
    remove: function(userId, doc) {
        return !!userId && userId == Meteor.userId();
    }
});