// 모듈 추출한다.
var http = require('http');
var express = require('express');

const cookieParser = require('cookie-parser');


// 웹서버를 생성한다.
var app = express();
app.use(express.static('public'));  // 기본폴더지정
// post요청시 파라미터 전달
app.use(express.bodyParser());
app.use(app.router);

// client.query('use company');




// 웹서버를 실행한다.
http.createServer(app).listen(52273, function () {
 console.log("Server Running at ..");
 console.log("http://127.0.0.1:52273");
});


