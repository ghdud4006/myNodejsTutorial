var express = require('express');
var bodyParser = require('body-parser'); //POST 의 body를 따올 수 있는 module
// body parser 는 미들웨어 
var app = express();



////////////////////////////////////////////////////////////////////////
/////////////////jade의 html변환 코드를 형식에 맞게 이쁘게 함 ////////////html source code
////////////////////////////////////////////////////////////////////////
app.locals.pretty = true;




////////////////////////////////////////////////////////////////////////
////////////// view engine 사용과, view디렉토리 설정 ///////////////////jade setting
////////////////////////////////////////////////////////////////////////
app.set('view engine', 'jade'); //for using jade module 
app.set('views', './views');




////////////////////////////////////////////////////////////////////////
////////////// static 디렉토리 설정 ////////////////////////////////////static path
////////////////////////////////////////////////////////////////////////
app.use(express.static('public')); // set static file dir





////////////////////////////////////////////////////////////////////////
/////////////// body-parser 적용 (POST의 body를 쓸 수 있게 적용) //////// body-parser
////////////////////////////////////////////////////////////////////////
app.use(bodyParser.urlencoded({extended:false})); //현재 app에 bodyparser를 사용





////////////////////////////////////////////////////////////////////////
/////////////////////// 기본 라우팅 ///////////////////////////////////// routing basic
////////////////////////////////////////////////////////////////////////
app.get('/', function(req, res){
	res.send('hello node');
});

app.get('/login', function(req, res){
	res.send('<h1>login please<h1>');
});





////////////////////////////////////////////////////////////////////////
//////////////////////// 라우팅 , 정적 파일 표현 //////////////////////// static file send
////////////////////////////////////////////////////////////////////////
app.get('/route', function(req, res){ // for static file expression
	res.send('Hello Router, <img src="/Screenshot from 2018-02-06 14-35-50.png">')
});





////////////////////////////////////////////////////////////////////////
///////////////////////// 정적인 파일을 동적 코딩 //////////////////////////// dynamic 
////////////////////////////////////////////////////////////////////////
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





////////////////////////////////////////////////////////////////////////
/////////////////////////////// 템플릿사용 (html파일 렌더링) ///////////// template, render, rendering
////////////////////////////////////////////////////////////////////////
app.get('/template', function(req, res){
	res.render('temp', {time:Date()});
});







////////////////////////////////////////////////////////////////////////
/////////////////////////// 쿼리스트링 ////////////////////////////////// query string
////////////////////////////////////////////////////////////////////////
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


// 보통 정보에 대한 주소를 나타낼때는 url상에 모든 정보를 나타내야한다.






////////////////////////////////////////////////////////////////////////
/////////////////////////////// 시멘틱 URL ////////////////////////////// simentic url
////////////////////////////////////////////////////////////////////////
app.get('/topic/:id/:mode', function(req, res){ //시맨틱 URL
    res.send(req.params.id + ',' + req.params.mode);
});







////////////////////////////////////////////////////////////////////////
/////////////////////////////// GET method ////////////////////////////// 
////////////////////////////////////////////////////////////////////////
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

app.get('/form_receiver', function(req, res){ //get's receiver
    var title = req.query.title;
    var description = req.query.description;
    res.send(title+','+description);
});








////////////////////////////////////////////////////////////////////////
//////////////////////////////// POST method ///////////////////////////////
////////////////////////////////////////////////////////////////////////
app.get('/form_post', function(req, res){ // POST 방식 전송 리시버만 app.post를 쓴다.!!!
    res.render('form_post');
});

app.post('/form_receiver', function(req, res){ //post's receiver
    //body-parser 모듈을 추가해서 사용해야한다 !
    //URL(/form_receiver)는 GET과 동일하게 쓸 수 있다 !
    var title = req.body.title; //POST방식은 app.post, req.body.variable 형식으로 사용한다. 
    var description = req.body.description;
    res.send(title+','+description);
});







////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// 리스너 포트 설정 /////////////////////////// lisetener, port
////////////////////////////////////////////////////////////////////////
app.listen(3000, function(){
	console.log('Connected 3000 port!');
});
