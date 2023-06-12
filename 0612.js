// 자바스크립트 
// 콜백함수를 파라미터로 전달하기
// 콜백함수 : 함수를 파라미터로 전달했을때 특정시점에 그 함수를 실행시켜주는 경우

function add(a,b,callback){
  var result=a+b;
  callback(result);
}

add(20,10, function(result){
 console.log("파라미터 콜백함수호출됨");
 console.log("결과 : ", result);
});

// 함수를 반환하고 반환된 함수를 실행하기
function mul(a,b, callback){
 var result=a*b;
 callback(result);
 var history=function(){
  return a+'*'+b +'='+result;
 };
 return history;
}
var mul_his=mul(8,9, function(result){
  console.log("mul 콜백함수 호출됨");
  console.log("결과 : %d" , result);
})
mul_his();
console.log("함수실행결과(return) : "+ mul_his());



