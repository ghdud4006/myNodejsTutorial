var OrientDB = require('orientjs'); //orient-nodejs간 연결 모듈

var server = OrientDB({ // 디비 설정
   host:       'localhost',
   port:       2424,
   username:   'root',
   password:   'ehd4qkd'
});

var db = server.use('o2'); // 사용 데이터베이스 설정
/*
var rec = db.record.get('#12:1').then(function(record){ //#12:1에 해당하는 레코드 get후 콜백처리
         console.log('Loaded Record:', record.title);
});
*/

// CREATE
//var sql='SELECT FROM topic';
//db.query(sql).then(function(results){
    //console.log(results);
//});


//var sql='SELECT FROM topic WHERE @rid=:rid'; //객체 전달 param의 rid와 :rid가 대응됌
//var param =  { //이건 그냥 변수 약속은 x 
    //params:{ //params는 약속 이렇게 써야함
        //rid:'#12:1'
    //}
//};
//db.query(sql,param).then(function(results){ //sql문에 param까지 전달 
    //console.log(results);
//});

//INSERT
var sql = 'INSERT INTO topic(title, description) VALUES(:title, :desc)';
//var param = {
    //params:{
        //title:'Express',
        //desc:'Express is framework for web'
    //}
//};

/*
db.query(sql, { //변수 직접 넣어줌 직접 객체 정의  
    params:{
        title:'Express',
        desc:'Express is framework for web'
    }
}).then(function(results){
    console.log(results);
});
*/

//UPDATE
//var sql = 'UPDATE topic SET title=:title WHERE @rid=:rid';
//db.query(sql, {params:{title:'Expressjs',rid:'#12:3'}}).then(function(results){
    //console.log(results);
//});


//DELETE
var sql = 'DELETE FROM topic WHERE @rid=:rid';
db.query(sql, {params:{rid:'#12:3'}}).then(function(results){
    console.log(results);
});

