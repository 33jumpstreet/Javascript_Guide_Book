var MARKER_LABELS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

var map;

// 지도에 표시된 마커 객체를 가지고 있을 배열입니다
var markers = {};

$(function(){

  // 쿠키에 저장되어 있는 여행지 목록 가져오기
  var myTrips = Cookies.getJSON('MYTRIPS');

  if (!myTrips)
    myTrips = [];

  //  카카오 MAP API 불러오기
  showMap();

  // 함수로 만든 여행지 목록 불러오기
  generateMyTripList(myTrips);

  // setMarkers(map);
});

function generateMyTripList(list) {
  var $list = $('#mytrip-list');
  var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 

  for (var i = 0; i < list.length; i++) {
    var myTrip = list[i];

    var markerLabel = MARKER_LABELS[i];
    var markerPosition  = new kakao.maps.LatLng(myTrip.x, myTrip.y); 

    // 마커 이미지의 이미지 크기 입니다
    var imageSize = new kakao.maps.Size(24, 35); 
    
    // 마커 이미지를 생성합니다    
    var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 

    var $item = $('#mytrip-item-template').clone().removeAttr('id');
    
    $item.data('id', myTrip.id);
    $item.find('.item-name').html(markerLabel + '. ' + myTrip.name);    
    $item.find('.item-city-name').html(myTrip.cityName)

    $item.find('.item-remove').click(function() {
      var $elem = $(this).closest('.mytrip-item');
      var id = $elem.data('id');

      $elem.remove();

      markers[id].setMap(null); 
      markers[id] = null; 

      var newList = removeFromList(list, id);

      Cookies.set('MYTRIPS', newList);
    });

    $list.append($item);
    
    var marker = new kakao.maps.Marker({
      map: map, // 마커를 표시할 지도
      position: markerPosition, // 마커를 표시할 위치
      image : markerImage, // 마커 이미지 
      label : markerLabel
    });

    // 생성된 마커를 배열에 추가합니다
    markers[myTrip.id] = marker;
  }
}

function removeFromList(list, id) {
  var index = -1; // 인덱스의 초기값을 -1, 즉 찾지 못했을 때의 값 설정

  for (var i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      index = i;
      break;
    }
  }

  if (index !== -1) { 
    list.splice(index, 1);
  }

  return list;
}

function showMap() {
  map = new kakao.maps.Map(document.getElementById('map'), {
    level: 8,
    center: new kakao.maps.LatLng(33.3617, 126.5292)
  });
}


