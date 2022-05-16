// 상수를 활용한 코드 개선
var SCISSORS = '가위';
var ROCK = '바위';
var PAPER = '보';

// 가위, 바위, 보 버튼 클릭 핸들러
function onButtonClick(userInput){
  var comInput;
  var rnd = Math.random();

  if(rnd<0.33){ // 0에서 0.33사이의 값, 1/3 확률(가위, 바위, 보 중에 하나)
      comInput = SCISSORS;
  } else if (rnd < 0.66) { // 0.33에서 0.66 사이의 값, 1/3 확률
      comInput = ROCK;
  } else {
      comInput = PAPER;
  }

  var result = '컴퓨터: ' + comInput;

  if (userInput === SCISSORS) {
    if(comInput === SCISSORS) {
      result += ' -컴퓨터와 비겼습니다.';
    } else if (comInput === ROCK) {
      result += ' -컴퓨터에게 졌습니다.';
    } else {
      result += ' -컴퓨터를 이겼습니다.';
     }
  } else if (userInput === ROCK) {
    if(comInput === SCISSORS) {
      result += ' -컴퓨터를 이겼습니다.';
    } else if (comInput === ROCK) {
      result += ' -컴퓨터와 비겼습니다.';
    } else {
      result += ' -컴퓨터에게 졌습니다.';
    }
  } else {
    if(comInput === SCISSORS) {
      result += ' -컴퓨터에게 졌습니다.';
    } else if (comInput === ROCK) {
      result += ' -컴퓨터를 이겼습니다.';
    } else {
      result += ' -컴퓨터와 비겼습니다.';
    }
  }

  alert(result);
}
