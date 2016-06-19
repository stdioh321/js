// var http = require('http');
var fs = require('fs');
// var moment = require("moment");
var express = require("express");
var port = process.env.PORT || 3000;
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
var mongoose = require('mongoose');

mongoose.connect('mongodb://stdioh321:stdioh321@ds023902.mlab.com:23902/stdioh321');

var Schema = mongoose.Schema;
var personSchema = new Schema({
    firstname: String,
    lastname: String,
    address: String
});

var Person = mongoose.model('Person', personSchema);

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "db"
});


app.set('view engine', 'ejs');

app.use('/public', express.static(__dirname + "/public"));

app.get('/', function(req, res) {
    res.send(fs.readFileSync(__dirname + "/index.html", {
        encoding: "utf8"
    }));
});

app.get('/user', function(req, res) {
    res.render("index", {
        title: "My first EJS Title",
        list: [
            1, 2, 3, 4, 5, 6, 7, 8, 9
        ],
        params: req.params,
        query: req.query
    });
});

app.get('/form-login', function(req, res) {
    res.render('form-login');
});

var urlencodedParser = bodyParser.urlencoded({
    extended: false
})

// POST /login gets urlencoded bodies
app.post('/login', urlencodedParser, function(req, res) {
    if (!req.body || req.body["username"] == undefined) return res.sendStatus(400)
    res.send(req.body);
})



app.get('/json', function(req, res) {
    res.json({
        name: "Jao"
    });
});

app.get('/db', function(req, res) {
    console.log(req.query);
    tb = req.query.table || "user";
    con.query("SELECT * FROM " + tb, function(err, data) {
        if (err) {
            res.sendStatus(400);
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

app.get('/db-mongo', function(req, res) {
    Person.find({}, function(err, data) {
        if (err) throw err;
        res.send(data);
    });
});
app.post('/db-mongo', function(req, res) {
    var user = Person({
        firstname: "Mario",
        lastname: "Nindendo",
        address: "64 Nintendo St"
    });
    user.save(function(err) {
        if (err) throw err;
        res.send("Success!!!");
    });
});

app.listen(port);

// var server = http.createServer(function(req, res) {
//     console.log(req.url);
//     res.writeHead(200, {
//         'Content-Type': "text/html"
//     });
//     read = fs.createReadStream(__dirname + "/index.html", {
//         encoding: "utf8"
//     });

//     read.on('data', function(chunk) {
//         chunk = chunk.replace('{Message}', moment().format("dddd, MMM of YYYY - hh:mm:ss"));
//         res.end(chunk);
//     });



// });
// server.listen(3000, function() {
//     console.log("Server listening....");
// });

// var fs = require("fs");
// var zlib = require('zlib');

// var readable = fs.createReadStream(__dirname + '/greet.txt', {
//     encoding: "utf8",
//     highWaterMark: 16 * 1024
// });

// var writeable = fs.createWriteStream(__dirname + "/greetcopy.txt");
// var greetz = fs.createWriteStream(__dirname + "/greetz.txt.gz");
// var glib = zlib.createGzip();

// readable.pipe(glib).pipe(greetz);

// var greet = fs.readFile(__dirname + '/greet.js', {
//     flag: 'r',
// 	encoding: 'utf8'
// }, function(err, data) {
//     if (err) {
//         console.log("Error");
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// });


// var buf = new ArrayBuffer(8)
// var view = new Int32Array(buf)
// view[0] = 5;
// view[1] = 15;
// console.log(view);


// function Person(name = "", email=""){
// 	this.name = name;
// 	this.email = email;
// }


// function Person2(){
// 	Person.apply(this,arguments);
// }

// p2 = new Person2("Jao", "asdsad");

// console.log(p2);

// var buf = new Buffer("Hello", "utf8");
// buf.write('Mario')
// console.log(buf);
// console.log(buf.toJSON());
// console.log(buf.toString());
// const EventEmitter = require('events');
// evt = new EventEmitter();
// evt.on("greet", function(){
// 	console.log('Hello 1');
// });
// evt.on("greet", function(){
// 	console.log('Hello 2');
// });
// evt.on("greet", function(){
// 	console.log('Hello 3');
// });
// evt.on("greet", function(){
// 	console.log('Hello 4');
// });

// evt.emit('greet');

// console.log(evt);

// console.log(EventEmitter);
// class MyEmitter extends EventEmitter {}

// const myEmitter = new MyEmitter();
// myEmitter.on('event', () => {
//   console.log('an event occurred!');
// });
// myEmitter.on('event', () => {
//   console.log('an event occurred!');
// });
// myEmitter.on('event', () => {
//   console.log('an event occurred!');
// });
// myEmitter.on('event', () => {
//   console.log('an event occurred!');
// });
// myEmitter.emit('event');

// import * as greetr from 'greet';
// const http = require('http');
// var util = require("util");

// var name = "Tony";
// var greeting = util.format('Hello, %s', name);
// util .log(greeting);

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World\n');
// });

// server.listen(port, hostname, () => {
//     console.log(`Server running at http://${hostname}:${port}/`);
// });