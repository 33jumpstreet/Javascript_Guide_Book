var list = [];

for (var i =1; i <= 45; i++){
  list.push(i);
}

var result = [];
for (var i=0; i<6; i++){

  var index = Math.floor(Math.random()*list.length);

  // 랜덤으로 선택한 인덱스의 값
  var num = list[index];

  // 배열에서 인덱스의 값 제거
  list.splice(index, 1);

  result.push(num);
}

// 비교 함수 사용
//function compare(a, b){
//	return a - b;
//}

// 익명 함수 사용
result.sort(function(a, b){
  return a - b;
});

for (var i=0; i<6; i++){
  document.write('<span class="ball">' + result[i] + '</span>');
}

