import { Meteor } from 'meteor/meteor';

Meteor.publish('productis', function() {
    return Products.find({});
});
Meteor.publish('categories', function() {
    return Categories.find({});
});
Meteor.publish(null, function() {
    return ProductImages.find({});
});

// Meteor.publish(null, function() {
//     return Meteor.roles.find({})
// });


Meteor.startup(function() {
    if (Meteor.users.find().count() < 1) {
        var users = [{
            name: "superuser",
            email: "superuser@example.com",
            roles: ['admin']
        }];

        _.each(users, function(user) {
            var id;
            id = Accounts.createUser({
                email: user.email,
                username: user.name,
                password: "password",
                profile: {
                    name: user.name
                }
            });
            if (user.roles.length > 0) {
                Roles.addUsersToRoles(id, user.roles);
            }
        });
    }
});