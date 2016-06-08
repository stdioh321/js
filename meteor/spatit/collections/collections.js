Categories = new Mongo.Collection('categories');
Categories.attachSchema(new SimpleSchema({
    name: {
        type: String,
        label: "Name"
    },
    slug: {
        type: String,
        label: "Slug"
    }
}));

getCategorieSlugs = function() {
    return Categories.find({}).fetch().map(function(el) {
        return el.slug;
    })
};

var reviews = new SimpleSchema({
    rating: {
        type: String,
        allowedValues: ["1", "2", "3", "4", "5"]
    },
    body: {
        type: String
    }
});

Products = new Mongo.Collection('productis');


Products.attachSchema(new SimpleSchema({
    name: {
        type: String,
        label: "Name"
    },
    categories: {
        type: String,
        label: "Categories",
        autoform: {
            options: function() {
                return Categories.find().fetch().map(function(el, index) {
                    return { label: el.slug.toUpperCase(), value: el.slug };
                });
            }
        }
    },
    prodImg: {
        type: String,
        label: "Product Image",
        optional: true
    },
    desc: {
        type: String,
        label: "Description"
    },
    is_featured: {
        type: Boolean,
        label: "Featured"
    },
    createdAt: {
        type: Date,
        label: "Created At",
        autoValue: function() {
            return new Date();
        },
        autoform: {
            type: 'hidden'
        }
    },
    reviews: {
        type: [reviews],
        label: "Reviews",
        // blackbox: true,
        optional: true

    }
}));




ProductImages = new FS.Collection("ProductImages", {
    stores: [new FS.Store.GridFS("ProductImages")]
});

// Questions = new Mongo.Collection('questions');

// Questions.attachSchema(new SimpleSchema({
//     question: {
//         type: String,
//         label: "Question",
//         max: 500
//     },
//     answer: {
//         type: String,
//         label: "Answer"
//     },
//     createdAt: {
//         type: Date,
//         label: "Created At",
//         autoValue: function() {
//             return new Date();
//         },
//         autoform:{
//          type: "hidden"
//         }
//     }
// }));