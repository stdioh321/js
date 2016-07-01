var express = require('express');
var router = express.Router();
var Products = require('./../db/products.js');

router.get("/product", function(req, res) {
    Products.find({}, function(err, data) {
        if (err) {
            res.status(400);
            res.send(err);
        } else {
            res.send(data);
        }
    });
});
router.post("/product", function(req, res) {
    var valInsert = new Products(req.body);
    valInsert.save(function(err, data) {
        if (err) {
            res.status(400);
            res.send(err);
        } else {
            res.send(data);
        }
    });

});

module.exports = router;