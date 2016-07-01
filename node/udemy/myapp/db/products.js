var mongoose = require('./connect');

var Schema = mongoose.Schema;
var productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    createAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

var Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;