var mongoose = require('./connect');

var Schema = mongoose.Schema;
var personSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name required"]
    },
    email: {
        type: String,
        required: [true, "Email required"]
    }
});

var Person = mongoose.model("Person", personSchema, "person");

module.exports = Person;