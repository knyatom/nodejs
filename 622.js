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
// Express의 미들웨어 불러오기
var bodyParser = require('body-parser');

  // Session 미들웨어 불러오기
var expressSession = require('express-session');

// 익스프레스 객체 생성
var app = express();

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }))

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json())

// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
 secret:'my key',
 resave:true,
 saveUninitialized:true
}));


// cookie-parser 설정
app.use(cookieParser());

// 라우터 설정
app.all('/process/showCookie',function(req,res){
 console.log("/process/showCookie 호출됨");
 //console.log(res.cookies);
 res.send(req.cookies);
});

app.all('/process/setUserCookie',function(req,res){
 console.log("/process/setUserCookie 호출됨");

 // 쿠키설정
 res.cookie('user',{
    id:"welcome",
    name: "blackpink",
    authorized:true
 }); 

 res.redirect('/process/showCookie');
});


// 웹서버를 실행한다.
http.createServer(app).listen(52273, function () {
 console.log("Server Running at ..");
 console.log("http://127.0.0.1:52273");
});


