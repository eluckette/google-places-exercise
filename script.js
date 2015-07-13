var map;
var service;
var infowindow;

function initialize(lat, long) {
  var sanFrancisco = new google.maps.LatLng(37.7833, -122.4167);

  map = new google.maps.Map(document.getElementById("map-canvas"), {
      center: sanFrancisco,
      zoom: 12
    });

  $("#submit-search").on("click", makeRequest);
}

function makeRequest(evt) {
  // clear map
  initialize();

  var latlong = {
    "bernal-heights": new google.maps.LatLng(37.741162, -122.417838),
    "the-castro": new google.maps.LatLng(37.760908, -122.435004),
    "chinatown": new google.maps.LatLng(37.794138, -122.407791),
    "cole-valley": new google.maps.LatLng(37.765041, -122.450230), 
    "fishermans-wharf": new google.maps.LatLng(37.808000, -122.417743),
    "the-haight": new google.maps.LatLng(37.769220, -122.448139),
    "hayes-valley": new google.maps.LatLng(37.775907, -122.424525),
    "inner-richmond": new google.maps.LatLng(37.779870, -122.464746),
    "inner-sunset": new google.maps.LatLng(37.760737, 122.467954),
    "the-marina": new google.maps.LatLng(37.774929, -122.419416),
    "the-mission": new google.maps.LatLng(37.759865, -122.414798),
    "nob-hill": new google.maps.LatLng(37.793014, -122.416113),
    "north-beach": new google.maps.LatLng(37.806053, -122.410331),
    "outer-richmond": new google.maps.LatLng(37.777677, -122.495310),
    "outer-sunset": new google.maps.LatLng(37.755445, -122.494069),
    "pacific-heights": new google.maps.LatLng(37.792515, -122.438231),
    "potrero-hill": new google.maps.LatLng(37.760493, -122.400869),
    "russian-hill": new google.maps.LatLng(37.801096, -122.419556),
    "soma": new google.maps.LatLng(37.778519, -122.405640),
    "tenderloin": new google.maps.LatLng(37.784660, -122.414506),
    "western-addition": new google.maps.LatLng(37.782211, -122.434178)
  }

  evt.preventDefault();
  var userSearch = $("#search-input").val();
  var userNeighborhood = $("#neighborhood").val();

  var request = {
    location: latlong[userNeighborhood],
    radius: '100',
    query: userSearch
  };

  service = new google.maps.places.PlacesService(map);
  service.textSearch(request, callback);

  // reset event listener
  $("#submit-search").on("click", makeRequest);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location,
  });

  var contentString = "<span class='searchContent'><strong>" + place.name + "</strong><br>" + place.formatted_address
  var infowindow = new google.maps.InfoWindow({
      content: contentString
  });
  
  google.maps.event.addListener(marker, "click", function() {
    infowindow.setContent(contentString);
    infowindow.open(map, this);
  });

  $('.tricky-to-find').on('click', function() {
    console.log('here');
  });
}

 
google.maps.event.addDomListener(window, "load", initialize);