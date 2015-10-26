var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var fs = require('fs');
var quotes = require(path.join(__dirname, 'lib', 'quotes'))

var app = express();

app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/api/listAllOggFiles/', function(req, res) {
    fs.readdir('public/sounds/', function(err, files){
        if (err) {
            throw err;
        }

        var filenames = [];
        for (var i = 0; i < files.length; i++) {
            filenames.push(files[i].split('.')[0]);
        }
        res.json(filenames);
    });
});

app.get('/api/getQuotes/', function(req, res){
    res.json(quotes);
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server up and running. Listening on port ' + app.get('port'));
});
