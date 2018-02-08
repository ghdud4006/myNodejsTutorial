const PORT = 3000;

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.locals.pretty=true;

app.set('views', './views');
app.set('view engine', 'jade');

app.get('/topic', function(req, res){
    res.render('topic');
});

app.get('/topic/new', function(req, res){
    res.render('new');
});

app.post('/topic/new', function(req, res){ 
    var title = req.body.title;
    var description = req.body.description;

    fs.writeFile('./data/'+title, description, function(err){
        res.status(500).send('Server Internal Error');
    });
    res.redirect('/topic'); 
});

app.listen(PORT, function(){
    console.log('PORT \''+PORT+'\' is connected...');
});
