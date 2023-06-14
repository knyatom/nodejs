var http=require('http');
var express=require("express");
var app=express();
app.use(express.static('public')); // 시작폴더지정

app.use(function(req,res){
  res.send("<h1>잘못들어오신것같은데요^.^</h1>");
});
app.use(function(req,res){

});




http.createServer(app).listen(52273,function(){
 console.log("Server Running at http://127.0.0.1:52273");
});

