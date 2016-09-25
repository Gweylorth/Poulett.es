var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var fs = require('fs');
var database = require(path.join(__dirname, 'lib', 'database'))

var app = express();

app.set('port', (process.env.PORT || 5000));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.render('index', {
        character: '""',
        quoteId: '""',
    });
});

app.get('/:character.:quoteId', function(req, res) {
    res.render('index', {
        character: '"' + req.params.character + '"',
        quoteId: '"' + req.params.quoteId + '"',
    });
});

app.get('/api/getQuotes/', function(req, res) {
    res.json(database);
});

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server up and running. Listening on port ' + app.get('port'));
});
