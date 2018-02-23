var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var conn = mysql.createConnection({ //mysql객체의 createConnection메소드를 호출하며 정보전송
      host     : 'localhost', //mysql서버가 어디있는가, database server주소 
      user     : 'root', // 접속할때 사용할 유저
      password : 'ehd4qkd', // pw 
      database : 'o2' //사용할 DB
});
conn.connect();
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.locals.pretty=true;

app.set('views', './views_mysql'); //template dir 경로 설정
app.set('view engine', 'jade');

/////////////////////////////////////////////////////////////////////////////////
///////////////////// home /////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
app.get(['/topic', '/topic/:id'], function(req, res){ //배열을 통해 다수의 url을 라우팅 
    var sql = 'SELECT id,title FROM topic';
    conn.query(sql, function(err, topics, fields){
        var id = req.params.id;   //res.send(results);
        if(id){
            var sql = 'SELECT * FROM topic WHERE id=?';
            conn.query(sql, [id], function(err, topic, fields){
            	if(err){
            		res.status(500).send('Internal Server Error');
            		console.log(err);
            	} else {
            		res.render('view', {topics:topics, topic:topic[0]}); // [0]을 하는 이유는 id에 해당하는 topic이 배열형태로 리턴되기 때문에 그걸 걷어준다. !!
            	}

            });
        } else {
            res.render('view', {topics:topics});
        }
    });
});

/////////////////////////////////////////////////////////////////////////////////
///////////////////// add /////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
app.get('/topic/add', function(req, res){
	var sql = 'SELECT id,title FROM topic';
    conn.query(sql, function(err, topics, fields){
    	if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
        	res.render('add', {topics:topics});
        }
    });
});

app.post('/topic/add', function(req, res){
    var title = req.body.title;
    var description = req.body.description;
    var author = req.body.author;
    var sql = 'INSERT INTO topic (title, description, author) VALUES(?,?,?)';
    conn.query(sql, [title, description, author], function(err, results, fields){
    	if(err){
    		console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
        	res.redirect('/topic/'+results.insertId);
        }
    });
});

/////////////////////////////////////////////////////////////////////////////////
///////////////////// edit /////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
app.get('/topic/:id/edit', function(req, res){ //배열을 통해 다수의 url을 라우팅 
    var sql = 'SELECT id,title FROM topic';
    conn.query(sql, function(err, topics, fields){
        var id = req.params.id;   //res.send(results);
        if(id){
            var sql = 'SELECT * FROM topic WHERE id=?';
            conn.query(sql, [id], function(err, topic, fields){
            	if(err){
            		res.status(500).send('Internal Server Error');
            		console.log(err);
            	} else {
            		res.render('edit', {topics:topics, topic:topic[0]}); // [0]을 하는 이유는 id에 해당하는 topic이 배열형태로 리턴되기 때문에 그걸 걷어준다. !!
            	}

            });
        } else {
            res.status(500).send('Internal Server Error');
            console.log('There is no id.');
        }
    });
});

app.post('/topic/:id/edit', function(req, res){ //배열을 통해 다수의 url을 라우팅
	var title = req.body.title; 
	var description = req.body.description; 
	var author = req.body.author; 
	var id = req.params.id;
    var sql = 'UPDATE topic SET title=?, description=?, author=? WHERE id=?';

    conn.query(sql, [title,description,author,id], function(err, results, fields){
    	if(err){
            res.status(500).send('Internal Server Error');
            console.log(err);
        } else {
       		res.redirect('/topic/'+id);
        }
    });
});
/////////////////////////////////////////////////////////////////////////////////
///////////////////// delete /////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
app.get('/topic/:id/delete', function(req, res){ //배열을 통해 다수의 url을 라우팅 
	var id = req.params.id;

	var sql = 'SELECT id,title FROM topic';
    conn.query(sql, function(err, topics, fields){
    	if(err){
            res.status(500).send('Internal Server Error');
            console.log(err);
        } else {
        	var sql = 'SELECT * FROM topic WHERE id=?';
        	conn.query(sql, [id], function(err, topic, fields){
        		if(err){
            		res.status(500).send('Internal Server Error');
            		console.log(err);
        		} else {
        			if(topic.length === 0){
        				res.status(500).send('Internal Server Error');
            			console.log('There is no id');
        			} else {
        				res.render('delete',{topics:topics, topic:topic[0]});
        			}
        		}
        	});
        }
    });
});

app.post('/topic/:id/delete', function(req, res){ //배열을 통해 다수의 url을 라우팅 
	var id = req.params.id;

	var sql = 'DELETE FROM topic WHERE id=?';
	conn.query(sql, [id], function(err, results){
		res.redirect('/topic');
	});
	
});

/////////////////////////////////////////////////////////////////////////////////
///////////////////// listen /////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
app.listen(3000, function(){
    console.log('Connected, 3000 PORT!');
});