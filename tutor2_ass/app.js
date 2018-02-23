const PORT = 3000;

var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.locals.pretty=true;

app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function(req, res){
    var output = `
        <DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>home</title>
            </head>
            <body>
                <h1><a href="/topic">Server Side JavaScript</a></h1>
                <article>
                    <h2>Welcome</h2>
                </article>
            </body>
        </html>
        `
    console.log('PORT '+PORT+' receives : GET \'/\' ');
    res.send(output);        
});

app.get('/topic', function(req, res){
    console.log('PORT '+PORT+' receives : GET \'/topic\' ');
    res.render('topic');
});

app.get('/topic/new', function(req, res){
    console.log('PORT '+PORT+' receives : GET \'/topic/new\' ');
    res.render('new');
});

app.post('/topic/new', function(req, res){ 
    var title = req.body.title;
    var description = req.body.description;

    fs.writeFile('./data/'+title, description, function(err){
        if(err){
        res.status(500).send('Server Internal Error');
        }
        console.log('PORT'+PORT+' receives : POST \'/topic/new\' ');
        res.redirect('/topic/index'); 
    });
});

app.get('/topic/index', function(req, res){
    fs.readdir('./data/', function(err, files){
        if(err){
            res.status(500).send('Server Internal Error');
        }
        console.log('PORT '+PORT+' receives : GET \'/topic/index\' ');
        
        res.render('index', {topics:files});
    });
});

app.get('/topic/index/:name', function(req, res){
   var name = req.params.name;
   fs.readFile('./data/'+name, 'utf8', function(err, data){
        if(err){
            res.status(500).send('Server Internal Error');
        }
        console.log('PORT '+PORT+' receives : GET \'/topic/index/'+name+'\' ');
        res.render('data',{title:name, description:data});
   });  
});

app.listen(PORT, function(){
    console.log('PORT \''+PORT+'\' is connected...');
});
