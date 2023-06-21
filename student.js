// 모듈 추출한다.
var http = require('http');
var express = require('express');
var mysql = require("mysql");

// 데이터베이스와 연결
var client = mysql.createConnection({
 user: 'root',
 password: '1234',
 database: 'college'
});

// 웹서버를 생성한다.
var app = express();
app.use(express.static('public'));  // 기본폴더지정
// post요청시 파라미터 전달
app.use(express.bodyParser());
app.use(app.router);

// client.query('use company');

// 라우터 설정
// 전체조회
app.get('/students', function (req, res) {
var sql="select * from students";
client.query(sql,function(err,result){
 res.send(result);
});

});  // get end

// 개별조회
app.get('/students/:id', function (req, res) {

}); // 개별조회 .. 

// 데이터추가
app.post('/students', function (req, res) {
 var id = req.body.id;
 var name = req.body.name;
 var pw = req.body.password;
 var email = req.body.email;
 var gender = req.body.gender;
 var data = { id, name, pw, email, gender };
 console.log(data);

 // DB연동
 var sql = "insert into students (id,name,password,email,gender) values (?,?,?,?,?)";
 //var query = "insert into students (id,name,pw,email,gender) values ('" + id + "','" + name + "','" + pw + "','" + email + "', '" + gender + "')";
 client.query(sql, [id, name, pw, email, gender], function (err, result) {
  if (err) console.log(err);

  //res.send(result);
  res.redirect("member_ok.html");

 });


}); // post end

// 데이터 수정
app.put('/students/:id', function (req, res) {

});

// 데이터 삭제
app.del('/students/:id', function (req, res) {

});


// 웹서버를 실행한다.
http.createServer(app).listen(52273, function () {
 console.log("Server Running at ..");
 console.log("http://127.0.0.1:52273");
});


