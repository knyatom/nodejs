// 쿠키설정하기(예제)

var http = require('http');
var express = require("express");
var app = express();
app.use(express.static('public'));
app.use(app.router);

var cookieParser = require('cookie-parser');

app.use(cookieParser());

app.get('/process/showCookie' ,function(req, res) {
 console.log('/process/showCookie 호출됨.');

 res.send(req.cookies); 
});

app.get('/process/setUserCookie' ,function(req, res) {
 console.log('/process/setUserCookie 호출됨.');

 // 쿠키 설정
 res.cookie('user', {
  id: 'admin',
  name: 'welcome',
  authorized: true
 });
 
 // redirect로 응답
 res.redirect('/process/showCookie');
});




http.createServer(app).listen(52273, function () {
  console.log("Server Running at http://127.0.0.1:52273");
});

