// 모듈을 추출합니다.
var http = require('http');
var express = require('express');
//웹 서버를 생성합니다.
var app = express();
app.use(express.static('public'));
app.use(express.bodyParser());
app.use(app.router);

app.post('/user', function(request, response) {
    var name = request.param('user_name');
    //var name =request.query.user_name;
    response.send(name);
});

app.get("/parameter",function(request,response){
 var name=request.query.name;
 var region=request.query.region;

 response.send(`<h1>${name} : ${region}</h1>`);
});

var items=[
 {name:'우유', price:200},
 {name:'홍차', price:300},
 {name:'커피', price:500} 
];

app.all('/data.html',function(req,response){
  var out="";
  items.forEach(function(item){
   out+="<div>";
   out+="<span>"+item.name+ ":" + item.price+"원</span>";
   out+="</div>";
  });
  response.send(out);
});



// 웹 서버를 실행합니다.
http.createServer(app).listen(52275, function() {
    console.log("server Running at http://127.0.0.1:52275");
});
// npm install express@3.4.7