var comScore = 0;
var userScore = 0;
var isComputerTurn = true; // 첫 슛은 컴퓨터부터 쏘는게 규칙이므로 초기값을 true
var shotsLeft = 15;

function showText(s){
  var textElem = document.getElementById('text');
  text.innerHTML = s;
}

function updateComputerScore(score){
   comScore += score;
   var comScoreElem = document.getElementById('computer-score');
   comScoreElem.innerHTML = comScore;
}

function updateUserScore(score){
  userScore += score;
  var userScoreElem = document.getElementById('user-score');
  userScoreElem.innerHTML = userScore;
}

function disableComputerButtons(flag){
  var computerButtons = document.getElementsByClassName('btn-computer');

  for (var i = 0; i < computerButtons.length; i++){
    computerButtons[i].disabled = flag;
  }
}

function disableUserButtons(flag){
  var userButtons = document.getElementsByClassName('btn-user');

  for (var i = 0; i < userButtons.length; i++){
    userButtons[i].disabled = flag;
  }
}


function onComputerShoot(){
  if(!isComputerTurn)
    return;

  var shootType = Math.random() < 0.5 ? 2: 3;

  if (shootType === 2) {
    if (Math.random() < 0.5){
      showText('컴퓨터가 2점슛을 성공시켰습니다.');
      updateComputerScore(2);
    } else {
      showText('컴퓨터가 2점슛을 실패습니다.');
    }
  } else {
    if (Math.random() < 0.33){
      showText('컴퓨터가 3점슛을 성공시켰습니다.');
      updateComputerScore(3);
    } else {
      showText('컴퓨터가 3점슛을 실패습니다.');
    }
  }

  // 컴퓨터 턴 종료
  isComputerTurn = false;
  // 컴퓨터 버튼 비활성화 및 유저 버튼 활성화
  disableComputerButtons(true);
  disableUserButtons(false);

  shotsLeft--;

  var shotsLeftElem = document.getElementById('shots-left');
  shotsLeftElem.innerHTML = shotsLeft;

  if (shotsLeft === 0) {
    if (userScore > comScore)
      showText('승리했습니다.');
    else if (userScore < comScore)
      showText('아쉽게도 졌습니다.');
    else
      showText('비겼습니다.');

    for (var i = 0; i < computerButtons.length; i++){
      computerButtons[i].disabled = true;
    }

    for (var i = 0; i < userButtons.length; i++){
      userButtons[i].disabled = true;
    }
  }
}

function onUserShoot(shootType){
  if(isComputerTurn)
    return;

  var textElem = document.getElementById('text');
  var userScoreElem = document.getElementById('user-score');

  if (shootType === 2) {
    if (Math.random() < 0.5){
      showText('2점슛이 성공했습니다.');

      updateUserScore(2);
    } else {
      showText('2점슛이 실패했습니다.');
    }
  } else {
    if (Math.random() < 0.33){
      showText('3점슛이 성공했습니다.');

      updateUserScore(3);
    } else {
      showText('3점슛이 실패했습니다.');
    }
  }

  // 유저 턴 종료
  isComputerTurn = true;
  // 컴퓨터 버튼 활성화 및 유저 버튼 비활성화
  disableComputerButtons(false);
  disableUserButtons(true);
}

