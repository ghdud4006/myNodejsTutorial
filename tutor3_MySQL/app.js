var mysql      = require('mysql');
var conn = mysql.createConnection({ //mysql객체의 createConnection메소드를 호출하며 정보전송
  host     : 'localhost', //mysql서버가 어디있는가, database server주소 
  user     : 'root', // 접속할때 사용할 유저
  password : 'ehd4qkd', // pw 
  database : 'o2' //사용할 DB
});
/////실제로는 별도의 파일을 빼서 오픈소스등을 사용할 시 기밀정보에 유의해야 한다. 

conn.connect(); //연결

var sql = 'SELECT * FROM topic WHERE id=?';
var id = 3;
conn.query(sql,[id], function(err, rows, fields){ // conn에 연결된 mysql db에 쿼리를 날림, 처리후 콜백함수 파라미터로 값 넘겨받음 
    if(err){
        console.log(err); //err 정보
    } else {
        console.log('rows',rows[0]); //행정보
        //console.log('fields',fields); //열 상세정보
    }
});


//var sql = 'SELECT * FROM topic';
//conn.query(sql, function(err, rows, fields){
    //if(err){
        //console.log(err);
    //} else {
        //for(var i=0; i<rows.length; i++){
            //console.log('title: ',rows[i].title); //행 한 행씩 그 행의 title 출력
            //console.log('description: ',rows[i].description);
            //console.log('author: ',rows[i].author);
            //console.log('========================');
        //}
    //}
//});

/* data삽입 
var sql='INSERT INTO topic (title, description, author) VALUES("Nodejs","Server side javascript","egoing")';
conn.query(sql, function(err, results, egoing){
    if(err){
        console.log(err);
    } else {
        console.log(results.insertId);
    }
});
*/

//배열을 이용해 sql문을 바꾸지 않고 치환자에 따라 그 순서에 배열로 값을 넣음 
//var sql='INSERT INTO topic (title, description, author) VALUES(?, ?, ?)';
//var params = ['Supervisor','Watcher', 'young'];
//conn.query(sql, params, function(err, results, egoing){ //두번째 인자값으로 params를 넘겨주면 내부적으로 치환시켜 처리 (보안으로도 굿)!!!!!
    //if(err){
        //console.log(err);
    //} else {
        //console.log(results.insertId);
    //}
//});

//var sql='UPDATE topic SET title=?, description=? WHERE id=?';
//var params = ['test','young', '7'];
//var sql = 'DELETE FROM topic WHERE id=?';
//var params = [6];
//conn.query(sql, params, function(err, results, egoing){ //두번째 인자값으로 params를 넘겨주면 내부적으로 치환시켜 처리 (보안으로도 굿)!!!!!
    //if(err){
        //console.log(err);
    //} else {
        //console.log(results);
    //}
//});



conn.end();
//connection.query('SELECT 1 + 1 AS solution', function (error, rows, fields) { //connect가 가리키는 서버에 쿼리를 보냄
  //if (error) throw error; //작업에 대한 처리가 끝나면 nodejs로 응답이 파라미터로 넘어옴 
  ////err: err정보, rows : 행, fields: 열 
  //console.log('The solution is: ', rows[0].solution);
//});

//connection.end();
