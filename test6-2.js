// Express 기본 모듈 불러오기
var express = require('express')
  , http = require('http')
  , path = require('path');

 // Express의 미들웨어 불러오기
var bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , static = require('serve-static')
 

// Session 미들웨어 불러오기
var expressSession = require('express-session');

// 익스프레스 객체 생성
var app = express();


// 기본 속성 설정
app.set('port', process.env.PORT || 3000);

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }))

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json())


app.use('/public', static(path.join(__dirname, 'public')));
// app.use('/', static(path.join(__dirname, 'public')));


// cookie-parser 설정
app.use(cookieParser());


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

  console.log(req.session.user);

  res.redirect('/public/product.html');

 } else {

  // 세션 저장

  req.session.user = {

   id: paramId,

   name: '소녀시대',

   authorized: true

  };

  console.log(req.session.user);

  res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});

  res.write('<h1>로그인 성공</h1>');

  res.write('<div><p>Param id : ' + paramId + '</p></div>');

  res.write('<div><p>Param password : ' + paramPassword + '</p></div>');

  res.write("<br><br><a href='/process/product'>상품 페이지로 이동하기</a>");

  res.end();

 }

});

 

// 로그아웃 라우팅 함수 - 로그아웃 후 세션 삭제함

app.all('/process/logout', function(req, res) {

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

 

// 상품정보 라우팅 함수

app.all('/process/product',function(req, res) {

 console.log('/process/product 호출됨.');

 

 if (req.session.user) {

  res.redirect('/public/product.html');

 } else {

  res.redirect('/public/login2.html');

 }

});

// 파일 업로드용 미들웨어

var multer = require('multer');

//클라이언트에서 ajax로 요청 시 CORS(다중 서버 접속) 지원

var cors = require('cors');

//multer 미들웨어 사용 : 미들웨어 사용 순서 중요  body-parser -> multer -> router
//npm install multer --save
// 파일 제한 : 10개, 1G

var storage = multer.diskStorage({

  destination: function (req, file, callback) {

      callback(null, 'uploads')

  },

  filename: function (req, file, callback) {

      var extension = path.extname(file.originalname);

      var basename = path.basename(file.originalname, extension);

      callback(null, basename + Date.now() + extension);

  }

});



var upload = multer({ 

  storage: storage,

  limits: {

  files: 10,

  fileSize: 1024 * 1024 * 1024

}

});




// Express 서버 시작

http.createServer(app).listen(app.get('port'), function(){

  console.log('Express server listening on port ' + app.get('port'));

  console.log("http://127.0.0.1:3000/public/login2.html");

});