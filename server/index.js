var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = new express();
var port = 3000;

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile('index.html', {root: './client/'});
});

app.get("/students", function(req, res) {
  fs.readFile(__dirname + '/students.json', function(err, data){
    if (err) throw err;
    students = JSON.parse(data);
    res.json(students);
  });
});

app.get("/students/:id", function(req, res){
  fs.readFile(__dirname + '/students.json', function(err, data){
    if (err) throw err;
    students = JSON.parse(data);
    res.json(students[req.params.id]);
  });
});

app.post("/students", function(req, res){
  var post = req.body;

  fs.readFile(__dirname + '/students.json', function(err, data){
    if (err) throw err;
    students = JSON.parse(data);
    students.push(post);

    fs.writeFile(__dirname + '/students.json', JSON.stringify(students, null, 4), function(err){
      console.log('post was added!');
      res.end();
    });
  });
});

app.put("/students/:id", function(req, res){
  post = req.body;
  fs.readFile(__dirname + '/students.json', function(err, data){
    if (err) throw err;
    students = JSON.parse(data);
    students[req.params.id] = post;

    fs.writeFile(__dirname + '/students.json', JSON.stringify(students, null, 4), function(err){
      console.log('post was updated!');
      res.end();
    });
  });
});

app.delete("/students/:id", function(req, res){
  fs.readFile(__dirname + '/students.json', function(err, data){
    if (err) throw err;
    students = JSON.parse(data);
    students.splice(req.params.id, 1);

    fs.writeFile(__dirname + '/students.json', JSON.stringify(students, null, 4), function(err){
      console.log('post was deleted!');
      res.end();
    });
  });
});

app.use(express.static(__dirname + '/../client'));

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port);
  }
});
