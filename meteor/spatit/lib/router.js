Router.configure({
    layoutTemplate: 'layout'
});
var OnBeforeAction = {
    loginRequired: function() {
        if (!Meteor.userId()) {
            Router.go("not_authorized");
        } else {
            this.next();

        }
    }
}

// Router.onBeforeAction(OnBeforeAction.loginRequired, {
//     except: ['home', 'products', 'category_products', 'not_authorized', "files"]
// });

Router.map(function() {
    //Home Routes
    this.route('home', {
        path: '/',
        template: 'home'
    });
    //Categories
    this.route('categories', {
        path: '/categories/',
        template: 'categories'
    });
    this.route('add_product', {
        path: '/add_product',
        template: 'add_product',
        onBeforeAction: function() {
            if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
                this.next();
            } else {
                Router.go("not_authorized");
            }
        }
    });
    //Products
    // this.route('products', {
    //     path: '/products',
    //     template: 'products',
    //     data: function() {
    //         templateData = {
    //             products: Products.find({}, { sort: { createdAt: -1 } })
    //         };
    //         return templateData;
    //     }
    // });
    this.route('category_products', {
        path: '/categories/:slug',
        template: 'category_products',
        data: function() {
            templateData = {
                category_products: Products.find({
                    categories: this.params.slug
                })
            };
            return templateData;
        }
    });
    this.route('new_review', {
        path: "new-review/:_id",
        template: "new_review",
        data: function() {
            return Products.findOne({ _id: this.params._id });
        }
    });
    this.route('product_info', {
        path: "product-info/:_id",
        template: "product_info",
        data: function() {
            return Products.findOne({ _id: this.params._id });
        }
    });
    this.route('not_authorized', {
        path: "not_authorized",
        template: "not_authorized"
    });

});

Router.route('products', {
    path: '/products',
    template: 'products',
    data: function() {
        templateData = {
            products: Products.find({}, { sort: { createdAt: -1 } })
        };
        return templateData;
    }
});
Router.route('/files', function() {
    var query = this.request.query,
        fields = {};

    fields[query.field] = query.field;

    this.response.statusCode = 200;
    this.response.end(JSON.stringify(Categories.find().fetch()));
}, { where: 'server' });