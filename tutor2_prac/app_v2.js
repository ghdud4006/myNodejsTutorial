var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.locals.pretty=true;

app.set('views', './views');
app.set('view engine', 'jade');



app.get('/topic/new', function(req, res){
    fs.readdir("data", function(err, files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error!');
        }
        res.render('new',{topics:files});
    }); 
});

app.post('/topic', function(req, res){
    var title = req.body.title;
    var description = req.body.description;

    fs.writeFile('data/'+title, description, function(err){
        if(err){
            //만약 err num이 500(내부오류)이면 res.send실행
            // eg. 만약 'dataaa/'이런식이면 에러창 res send됌
            res.status(500).send('Internal Server Error');
        }
        ///redirection 사용자를 해당 url로 보내버림
        res.redirect('/topic/'+title); 
        //res.redirect('/topic');
    }); 
});

app.get(['/topic', '/topic/:id'], function(req, res){ //배열을 통해 다수의 url을 라우팅 
    var id = req.params.id;
    fs.readdir('data',function(err, files){ 
        //////////////////// @readdir callback /////////////////////////
        if(err){
            res.status(500).send('Internal Server Error');
        }

        if(id){
        	fs.readFile('data/'+id, 'utf8', function(err, data){ 
                ////////////////// @@readFile callback///////////////////////////////////// 
        		if(err){
        		    res.status(500).send('Internal Server Error');
        		}
				res.render('view', {topics:files, title:id, description:data});
    		}); /////////////////  @@readFile end/////////////////////////////////////////// 
        }else{
        	res.render('view', {topics:files, title:'Welcome', description:'NodeJS'});
        }
    });/////////////////// @readdir end ////////////////////////////////
});


app.listen(3000, function(){
    console.log('Connected, 3000 PORT!');
});
