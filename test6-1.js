// 쿠키설정하기(예제)

var http = require('http');
var express = require("express");
var app = express();
app.use(express.static('public'));
app.use(app.router);

var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var bodyParser = require('body-parser');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// 세션 설정
app.use(expressSession({
 secret:'my key',
 resave:true,
 saveUninitialized:true
}));

// 로그인 라우팅 함수 - 로그인 후 세션 저장함
app.all('/process/login',function(req, res) {
 console.log('/process/login 호출됨.');

 var paramId = req.body.id || req.query.id;
 var paramPassword = req.body.password || req.query.password;
 
 if (req.session.user) {
  // 이미 로그인된 상태
  console.log('이미 로그인되어 상품 페이지로 이동합니다.');
  
  res.redirect('/public/product.html');
 } else {
  // 세션 저장
  req.session.user = {
   id: paramId,
   name: '소녀시대',
   authorized: true
  };
  
  res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
  res.write('<h1>로그인 성공</h1>');
  res.write('<div><p>Param id : ' + paramId + '</p></div>');
  res.write('<div><p>Param password : ' + paramPassword + '</p></div>');
  res.write("<br><br><a href='/process/product'>상품 페이지로 이동하기</a>");
  res.end();
 }
});

// 로그아웃 라우팅 함수 - 로그아웃 후 세션 삭제함
app.all('/process/logout',function(req, res) {
 console.log('/process/logout 호출됨.');
 
 if (req.session.user) {
  // 로그인된 상태
  console.log('로그아웃합니다.');
  
  req.session.destroy(function(err) {
   if (err) {throw err;}
   
   console.log('세션을 삭제하고 로그아웃되었습니다.');
   res.redirect('/public/login2.html');
  });
 } else {
  // 로그인 안된 상태
  console.log('아직 로그인되어있지 않습니다.');
  
  res.redirect('/public/login2.html');
 }

});


http.createServer(app).listen(52273, function () {
  console.log("Server Running at http://127.0.0.1:52273");
});

