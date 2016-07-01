var express = require('express');
var router = express.Router();
var Person = require('./../db/person.js');


router.get('/person', function(req, res) {
    Person.find({}, function(err, data) {
        if (err) throw err;
        res.send(data);
    })

});
router.delete('/person/:id', function(req, res) {
    Person.remove({
        _id: req.params.id
    }, function(err, data) {
        if (err || data.result.n < 1) {
            res.status(400)
            res.send(data);
        } else {
            res.send(data);
        }

    })


});
router.get('/person/:id', function(req, res) {
    Person.find({
        _id: req.params.id
    }, function(err, data) {
        if (err) {
            res.status(400);
            res.send(err);
        } else {
            res.send(data);
        }

    })

});

router.post('/person', function(req, res) {
    var p = new Person(req.body);
    p.save(function(err, data) {
        if (err) {
            res.status(400);
            res.send(err);

        } else {
            res.send(data);
        }
    });
});

module.exports = router;