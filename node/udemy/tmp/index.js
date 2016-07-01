var mongo = require("mongodb");

var mongoClient = mongo.MongoClient;
var url = "mongodb://localhost:27017/local";

mongoClient.connect(url, function(err, db) {
    if (err) {
        throw err;
    } else {
        console.log("Connected\n");
        person = db.collection("person");
        p = { "name": "Carlos", "email": "carlos@gmail.com" };
        person.find({}).sort({ name: 1 }).toArray(function(err, data) {
            if (err) throw err;
            console.log(data);
            db.close();
        });
    }
});