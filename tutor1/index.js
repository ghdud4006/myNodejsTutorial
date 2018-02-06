const express = require('express');
var app = express();

app.set('view engine', 'jade'); //use jade module 
app.set('views', './views');
app.use(express.static('public')); // set static file dir


app.get('/', function(req, res){
	res.send('hello node');
});

app.get('/login', function(req, res){
	res.send('<h1>login please<h1>');
});

app.get('/route', function(req, res){ // for static file expression
	res.send('Hello Router, <img src="/Screenshot from 2018-02-06 14-35-50.png">')
});

app.get('/dynamic', function(req, res){
	var lis='';
	for(var i=0; i<5; i++){
		lis = lis + '<li>coding </li>';
	}
	var time = Date();
	var output = 
`<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
		Hello dynamic
		<ul>
			${lis}
		</ul>
		${time}
	</body>
</html>`
	res.send(output);
});

app.get('/template', function(req, res){
	res.render('temp', {time:Date()});
});


app.listen(3000, function(){
	console.log('Connected 3000 port!');
});
