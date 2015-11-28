var restify = require('restify'),
    fs = require('fs'),
    ser = require('./temperature.js');

function respond(req, res, next) {
    res.send('hello ' + req.params.name);
    next();
}

function getData(req, res, next) {
    var jsonStr = {
        temperature: ser.getTemp(),
        data2: '0',
        data3: '0'
    };
    //var responseString = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
    res.send(jsonStr);
    next();
}

var server = restify.createServer();
server.get('/hello/:name', respond);
server.get('/data', getData);

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
