const PORT = 3000;

//// SETTING
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//// DB
var OrientDB = require('orientjs'); //orient-nodejs간 연결 모듈

var server = OrientDB({ // 디비 설정
   host:       'localhost',
   port:       2424,
   username:   'root',
   password:   'ehd4qkd'
});

//// APP SETTING
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.locals.pretty=true;
app.set('views', './views');
app.set('view engine', 'jade');
app.use(express.static('public'));

//HOME
app.get('/', function(req, res){
	res.render('home');
});

// LIST
app.get(['/list', '/list/:id'], function(req, res){
	var sql = 'SELECT title,id FROM topic';
	conn.query(sql, function(err, results, fields){
		if(err){
			console.log(err);
			res.send('Internal Server Error');
		} else {
			var id = req.params.id;
			if(id){
				var sql = 'SELECT * FROM topic WHERE id=?';
				conn.query(sql, [id], function(err, result, fields){
					if(err){
						res.status(500).send('Internal Server Error');
            			console.log(err);
					}else{
						res.render('list', {topics:results, topic:result[0]}); // /list/:id
					}
				});
			} else {
				res.render('list', {topics:results}); // /list
			}
		}
	});
});

// ADD
app.get('/add', function(req, res){
	res.render('add');
});

app.post('/add', function(req, res){
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;
    var sql = 'INSERT INTO topic (title, description, author) VALUES(?,?,?)';
    conn.query(sql, [title, description, author], function(err, result, fields){
        if(err){
    		res.status(500).send('Internal Server Error');
           	console.log(err);
        } else {
            res.redirect('/list/'+result.insertId);
            console.log(result);
        }
    });
});

//DELETE
app.get('/list/:id/delete', function(req, res){
    var id = req.params.id;
     
    var sql = 'SELECT id, title FROM topic WHERE id=?';
    conn.query(sql, [id],function(err, results, fields){
        res.render('delete', {topic: results[0]});
    });
});

app.post('/list/:id/delete', function(req, res){
	var id = req.params.id;
	var sql = 'DELETE FROM topic WHERE id=?';
	conn.query(sql, [id], function(err, results, fields){
		res.redirect('/list');
	});
});

//EDIT
app.get('/list/:id/edit', function(req, res){
    var id = req.params.id;
    var sql = 'SELECT * FROM topic WHERE id=?';
    conn.query(sql, [id],function(err, results, fields){
        res.render('edit', {topic: results[0]});
    });
});

app.post('/list/:id/edit', function(req, res){
	var id = req.params.id;
	var title = req.body.title;
	var description = req.body.description;
	var author = req.body.author;

	var sql = 'UPDATE topic SET title=?, description=?, author=? WHERE id=?';
	conn.query(sql, [title, description, author,id], function(err, results, fields){
		res.redirect('/list');
	});
});

// LISTNER
app.listen(PORT, function(){
	console.log('Connected, '+PORT+' PORT !');
});