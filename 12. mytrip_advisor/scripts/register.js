$(function() {
  generateYears($('#sel-birth'));
  $('#sel-birth').selectmenu(); // 제이쿼리 ui 라이브러리를 사용

  // 출생년도 목록을 스크롤해서 보이도록 변경
  var birthSelect = $('#sel-birth').selectmenu(); 
  birthSelect.selectmenu('menuWidget').addClass('overflow');

  $('#form-register').submit(function(e) {
    e.preventDefault();

    $(this).find('.txt-warning').empty().hide();

    // 이메일의 유효성 체크
    var email = $('#inp-email').val();

    if(!validateEmail(email)) {
      $('#inp-email').next().html('잘못된 형식입니다.').show();
      return;
    }

    // 비밀번호 유효성 체크
    var password = $('#inp-confirm').val();

    if(!validatePassword(password)) {
      $('#inp-password').next().html('대문자와 숫자가 포함된 최소 8자의 문자열이여야 합니다.').show();
      return;
    }

    if(password != confirm){
      $('#inp-confirm').next().html('비밀번호와 일치하지 않습니다.').show();
      return;
    }

    // 성별
    var gender = $('input[name="gender"]:checked').val();

    if(!gender) {
      $('#inp-male').siblings('.txt-warning').html('필수항목입니다.').show();
      return;
    }

    // 출생년도
    var birth = $('#sel-birthh').val();

    if(!birth) {
      $('#sel-birth').siblings('.txt-warning').html('필수항목 입니다.').show();
      return;
    }

    // 동의합니다. 체크박스
    var accept = $('#inp-accept:checked').val();

    if(!accept) {
      $('#inp-accept').next().html('필수항목입니다.').show();
      return;
    }

    submit(email, password, gender, birth);
  })
});

function generateYears($select) {
  for (var i=1970; i < 2010; i++){
    $select.append('<option value=""' + '">' + i +'</option>');
  }
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validatePassword(password) {
  var re = /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
  return re.test(password);
}

function submit(email, password, gender, birth) {
  var params = {
    email : email,
    password : password,
    gender : gender,
    birth :birth
  };

  $.post('some-api-url', params, function(){
    console.log(r);
  });
}