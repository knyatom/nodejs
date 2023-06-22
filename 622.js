var express = require('express')

  , http = require('http')

  , path = require('path');

 

// Express의 미들웨어 불러오기

var bodyParser = require('body-parser')

  , cookieParser = require('cookie-parser')

  , static = require('serve-static')




// 익스프레스 객체 생성

var app = express();

 

// 기본 속성 설정

app.set('port', process.env.PORT || 3000);

 

// body-parser를 이용해 application/x-www-form-urlencoded 파싱

app.use(bodyParser.urlencoded({ extended: false }))

 

// body-parser를 이용해 application/json 파싱

app.use(bodyParser.json())

 
app.use('/', static(path.join(__dirname, 'public')));

 
// cookie-parser 설정

app.use(cookieParser());

app.all('/pro2/showCookie',function(req, res) {

 console.log('/pro2/showCookie 호출됨.');
  res.send(req.cookies);
});

 
app.all('/pro2/setUserCookie',function(req, res) {
 console.log('/pro2/setUserCookie 호출됨.');
  // 쿠키 설정
 res.cookie('user', {
  id: 'mike',
  name: '소녀시대'  
 });
  // redirect로 응답
 res.redirect('/pro2/showCookie');
});


app.all('/logout2',(req,res)=>{
 //res.clearCookie();
 console.log('logout2..');
 res.clearCookie('user',{path:'/'});

});

app.all('/login2',(req,res)=>{
 console.log('login2..');
 // 쿠키 설정
 res.cookie('user', {
  id: 'mike1',
  name: 'welcome'
 
 });
});


// 웹서버를 실행한다.
http.createServer(app).listen(52274, function () {
 console.log("Server Running at ..");
 console.log("http://127.0.0.1:52274");
});


