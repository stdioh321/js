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
//         	type: "hidden"
//         }
//     }
// }));