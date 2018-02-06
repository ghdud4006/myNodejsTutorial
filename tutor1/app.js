const express = require('express');
var app = express();

app.locals.pretty = true;
app.set('view engine', 'jade'); //for using jade module 
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

app.get('/topic1', function(req, res){ //쿼리스트링 1
    res.send(req.query.id + ' and ' + req.query.name); //쿼리 넘겨받아 출력 
    //res.send(req.query.id);
    //res.send(req.query.name);
    //res.send(req.query.hello);
});

app.get('/topic2', function(req, res){ //쿼리 스트링 2 
     var topics = [
        'Topic1',
        'Topic2',
        'Topic3'
    ];
     res.send(topics[req.query.id]);
});

app.get('/topic3', function(req, res){ //쿼리 스트링 3
    var topics = [
        'Topic1',
        'Topic2',
        'Topic3'
    ];
    var output = `
        <a href="/topic3?id=0">Topic1</a><br>
        <a href="/topic3?id=1">Topic2</a><br>
        <a href="/topic3?id=2">Topic2</a><br>
        ${topics[req.query.id]}
        `;
    //var output = str + topics[req.query.id];
    res.send(output);
});

app.get('/topic/:id/:mode', function(req, res){ //시맨틱 URL
    res.send(req.params.id + ',' + req.params.mode);
});

app.get('/form_get', function(req, res){ //get일경우에만 쿼리스트링으로 받아옴
    res.render('form_get');
    /*
    form(action='/form_receiver' method='get') //submit시에 form receicer가 처리
    p
       input(type='text' name='title') //쿼리스트링으로 title 변수에 넘어옴
    p
       textarea(name='description') //쿼리 스트링으로 description 변수에 넘어옴
    p
       input(type='submit') //submit 시 /form_receiver?title=**&description=**으로 넘어옴
    */
});

app.get('/form_get_receiver', function(req, res){
    var title = req.query.title;
    var description = req.query.description;
    res.send(title+','+description);
});


app.post('/form_post', function(req, res){
    res.render('form_post');
});

app.post('form_post_receiver', function(req, res){
    
});

app.get('/test', function(req, res){ 
    var output=`
        <!DOCTYPE html>
        <html>
            <head>
            </head>
            <body>
                <a href="/test?id=0">hello</a>
            </body>
        </html>
        `;
    res.send(output);
});


app.listen(3000, function(){
	console.log('Connected 3000 port!');
});
