console.log("welcome nodejs");
// 노드제이에서 자바스크립트 실습하기
var age = 20;
console.log('나이 : %d', age);
var name = "소녀시대";
console.log('이름 : %s', name);
var Person = {}
Person['age'] = 20;
Person['name'] = "소녀시대";
Person.mobile = "010-4000-1000";
console.log("전화 %s", Person["mobile"]);
function add(a, b) {
 return a + b;
}
var result = add(10, 20);
console.log("더하기 : %d", result);
Person.mul = function (a, b) {
 return a * b;
}
console.log("곱하기 : %d", Person.mul(9,9));

var Person2={
 age:20,
 name:"우주시대",
 minus:function(a,b){
  return a-b;
 }
}
console.log("빼기 : %d" , Person2.minus(2,100));











