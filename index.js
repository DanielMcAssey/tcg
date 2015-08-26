var express = require('express');
var app = express();

app.set('view engine', 'ejs');

// We initialize Bookshelf
var bookshelf = require('./db.js');

// TODO: Load Models

// Here we try to load a user if the session exists
app.use(require('./middlewares/user'));

//And then we give control over to our controllers!
app.use(require('./controllers/'));

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening on http://%s:%s", host, port);
});
