var map;

// search에서 id 문자열 파싱해주는 함수
function parseId(str){
  var s = str.substring(1);
  var args = s.split('&');

  for (var i=0; i<args.length; i++){
    var arg = args[i];
    var tokens = arg.split('=');

    if (tokens[0] === 'id'){
      return tokens[1];
    }

    return null;
}}

$(function() {
  var id = parseId(window.location.search);
  // console.log('id', id);
  getDetail(id);
  showMap();
});

function getDetail(id) {
  var url = 'https://javascript-basic.appspot.com/locationDetail';
  $.getJSON(url, {
    id : id
  }, function(r) {
    // console.log(r);
    $('.detail-header-name').html(r.name);
    $('.detail-header-city-name').html(r.cityName);
    $('.detail-desc-text').html(r.desc)
    
    var $gallery = $('#detail-images');
    var images = r.subImageList;

    for (var i = 0; i < images.length; i++){
      var $image = $('<img src="' + images[i] +'" />');
      $gallery.append($image);
    }

    Galleria.loadTheme('libs/galleria/themes/classic/galleria.classic.min.js');
    Galleria.run('#detail-images');

    showMarkekr(r.position.x, r.position.y);

    // Cookie를 JSON으로 저장
    $('.btn-register').click(function(){
      var myTrips = Cookies.getJSON('MYTRIPS'); // 우리가 저장할 쿠키의 이름을 MYTRIPS

      // 존재하지 않을 경우 빈 배열로 초기화
      if(!myTrips)
        myTrips = [];

      // 여행지를 myTrips에 추가
      myTrips.push({
        id: id,
        name: r.name,
        cityName: r.cityName,
        x: r.position.x,
        y: r.position.y
      });

      Cookies.set('MYTRIPS', myTrips);

      alert('여행지가 등록되었습니다!')
    });
  });
}

function showMap() {
  map = new kakao.maps.Map(document.getElementById('map'), {
    level: 3,
    center: new kakao.maps.LatLng(33.3617, 126.5292)
  });
}

function showMarkekr(lat, lng) {
  var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = { 
        center: new kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };

  var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

  // 마커가 표시될 위치입니다 
  var markerPosition  = new kakao.maps.LatLng(lat, lng); 

  // 마커를 생성합니다
  var marker = new kakao.maps.Marker({
    position: markerPosition
  });

  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);
}

