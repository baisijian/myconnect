var express = require('express')
  , morgan = require('morgan')
  , fs = require('fs')
  , path = require('path')
  , multipart = require('connect-multiparty');
var app = express();
app.use(express.static('./public'));
app.use(morgan('dev'));
app.listen(process.env.PORT || 3000);
console.log('Node.js Ajax Upload File running at: http://0.0.0.0:3000');


app.post('/upload', function(req, res, next) {
  //get filename
  var filename = req.files.files.originalFilename || path.basename(req.files.files.ws.path);
  //copy file to a public directory
  var targetPath = path.dirname(__filename) + '/public/' + filename;
  //copy file
  fs.createReadStream(req.files.files.ws.path).pipe(fs.createWriteStream(targetPath));
  //return file url
  res.json({code: 200, msg: {url: 'http://' + req.headers.host + '/' + filename}});
});


app.get('/', function(req, res) {
    fs.readFile(__dirname + '/aa.html', 'utf8', function(err, text){
        res.send(text);
    });
});

app.get('/env', function(req, res){
  console.log("process.env.VCAP_SERVICES: ", process.env.VCAP_SERVICES);
  console.log("process.env.DATABASE_URL: ", process.env.DATABASE_URL);
  console.log("process.env.VCAP_APPLICATION: ", process.env.VCAP_APPLICATION);
  res.json({
    code: 200
    , msg: {
      VCAP_SERVICES: process.env.VCAP_SERVICES
      , DATABASE_URL: process.env.DATABASE_URL
    }
  });
});