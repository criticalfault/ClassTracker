var rooms = [];
var pin;
var night = false;
var info;
var small_red = new Image();

small_red.src = '/assets/maptest1.png';




window.addEventListener("load",function()
{
  initMap();
	document.getElementById("form").addEventListener("submit",function(e)
	{
		e.preventDefault();
		DoSearch();
    return false;
	});
});

function DoSearch()
{
  if(pin)
  {
    pin.setMap(null);
  }
  
  var userinput = document.getElementById("room").value;
  console.log("Got to Search Set to:" + userinput);

  if(info)
  {
    info.close();
  }

  if(userinput != null)
  {
    userinput = userinput.toLowerCase();
    console.log("userinput is being checked. Set to:" + userinput);
    var found;
    

    for(var i=0; i<rooms.length;i++)
    {
      console.log(rooms[i]);
      if(rooms[i][userinput])
      {
        found = rooms[i][userinput];
      }
    }
  
    if(found)
    {
      //Creating the small info window with its title above it.
      info = new google.maps.InfoWindow
      ({
        title: found.title,
        content: found.content,
        maxWidth: 300
      });

      //Opening the info window
      info.open(map, found)

      //Moving the map to the pins position
      DoMove(found.position);

      //Clearing the input field
      document.getElementById("room").value = "";

      //Add the click event listener for the window popup!
      found.addListener('click' ,function() 
      {

        if(infoWindow)
        {
          return;
        }

        infoWindow = new google.maps.InfoWindow(
        {
          title: found.title,
          content: found.content,
          maxWidth: 300
        });
        
        infoWindow.open(map, found);
      });
      

      window.location = "#map";
      //Dropping the pin on the map
      found.setMap(map);
      pin = found;
    }
    else
    {
      alert("No room found for '" +userinput+"'");
    }
  }
  return false;
}


function DoMove(pos)
{
  //Do all the position moving
  map.panTo(pos);
  map.setZoom(17);          
}



function initMap() 
{
  var style = [];

  $.ajax(
  {
    url: "http://api.sunrise-sunset.org/json?lat=28.590308&lng=-81.305318&date=today",
    context: document.body
  })
  .done(function(event) 
  {
    var current = new Date(Date.now());
    var sunset  = new Date(Date.parse("01/01/2011 " + event.results.sunset));
    if(current.getHours() > sunset.getHours())
    {

      night = true;
    }
    else
    {
 
      night = false;
    }


    rooms = [{
        "fs4g-103" : new google.maps.Marker({
        position: {lat: 28.590308, lng: -81.305318},      
        title: '4G Rooms 101, 103',
        animation: google.maps.Animation.DROP,
        content: '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h1 id="firstHeading" class="firstHeading">4G - Rooms 101 & 103</h1>'+
          '<div id="bodyContent">'+
          '<p>Two Entrances to this building.</p>'+
          '<p>Front</p><p><a href ="https://criticalfault.github.io/ClassTracker/Assets/4G_Entrance.jpg"><img class="helpers" src="assets/4G_Entrance.jpg"></a></p>'+
          '<p>Rear</p><p><a href ="https://criticalfault.github.io/ClassTracker/Assets/4G_Rear_Entrance.jpg"><img class="helpers" src="assets/4G_Rear_Entrance.jpg"></a></p>'+
          '</div>'+
          '</div>'})},{  

          "fs4g-101" : new google.maps.Marker({
        position: {lat: 28.590308, lng: -81.305318},      
        title: '4G Rooms 101, 103',
        animation: google.maps.Animation.DROP,
        content: '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h1 id="firstHeading" class="firstHeading">4G - Rooms 101 & 103</h1>'+
          '<div id="bodyContent">'+
          '<p>Two Entrances to this building.</p>'+
          '<p>Front </p><p><a href ="https://criticalfault.github.io/ClassTracker/Assets/4G_Entrance.jpg"><img class="helpers" src="assets/4G_Entrance.jpg"></a></p>'+
          '<p>Rear </p><p><a href ="https://criticalfault.github.io/ClassTracker/Assets/4G_Rear_Entrance.jpg"><img class="helpers" src="assets/4G_Rear_Entrance.jpg"></a></p>'+
          '</div>'+
          '</div>'})},  
       
          {"fs4a-102" : new google.maps.Marker({
        position: {lat: 28.59282786, lng: -81.30535165},
        title: '4A Room-102',
        animation: google.maps.Animation.DROP,
        content: '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h1 id="firstHeading" class="firstHeading">4A - Room 102</h1>'+
          '<div id="bodyContent">'+
          '<p>Three Entrances to this building.</p>'+
          '<p>Front</p><p><a href="https://criticalfault.github.io/ClassTracker/Assets/4A_Entrance_1.jpg"> <img class="helpers" src="assets/4A_Entrance_1.jpg"></a></p>'+
          '<p>Secondary Front</p><p> <a href="https://criticalfault.github.io/ClassTracker/Assets/4A_Entrance_1.jpg"><img class="helpers" src="assets/4A_Entrance_2.jpg"></a></p>'+
          '<p>Rear </p><p><a href= "https://criticalfault.github.io/ClassTracker/Assets/4A_Rear_Entrance.jpg"><img class="helpers" src="assets/4A_Rear_Entrance.jpg"></p>'+
          '</div>'+
          '</div>'})}, 


                      //28.592797, -81.305181
          {"fs4a-103" : new google.maps.Marker({
        position: {lat: 28.592797, lng: -81.305181},
        title: '4A Room 103',
        animation: google.maps.Animation.DROP,
        content: '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h1 id="firstHeading" class="firstHeading">4A - Room 103</h1>'+
          '<div id="bodyContent">'+
          '<p>Three Entrances to this building.</p>'+
          '<p>Front</p><p><a href="https://criticalfault.github.io/ClassTracker/Assets/4A_Entrance_1.jpg"> <img class="helpers" src="assets/4A_Entrance_1.jpg"></a></p>'+
          '<p>Secondary Front</p><p> <a href="https://criticalfault.github.io/ClassTracker/Assets/4A_Entrance_1.jpg"><img class="helpers" src="assets/4A_Entrance_2.jpg"></a></p>'+
          '<p>Rear </p><p><a href= "https://criticalfault.github.io/ClassTracker/Assets/4A_Rear_Entrance.jpg"><img class="helpers" src="assets/4A_Rear_Entrance.jpg"></p>'+
          '</div>'+
          '</div>'})},

          {"fs4a-106" : new google.maps.Marker({
        position: {lat: 28.5927971, lng: -81.3051811},
        title: '4A Room 106',
        animation: google.maps.Animation.DROP,
        content: '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h1 id="firstHeading" class="firstHeading">4A - Room 106</h1>'+
          '<div id="bodyContent">'+
          '<p>Three Entrances to this building.</p>'+
          '<p>Front</p><p><a href="https://criticalfault.github.io/ClassTracker/Assets/4A_Entrance_1.jpg"> <img class="helpers" src="assets/4A_Entrance_1.jpg"></a></p>'+
          '<p>Secondary Front</p><p> <a href="https://criticalfault.github.io/ClassTracker/Assets/4A_Entrance_1.jpg"><img class="helpers" src="assets/4A_Entrance_2.jpg"></a></p>'+
          '<p>Rear </p><p><a href= "https://criticalfault.github.io/ClassTracker/Assets/4A_Rear_Entrance.jpg"><img class="helpers" src="assets/4A_Rear_Entrance.jpg"></p>'+
          '</div>'+
          '</div>'})},

          {"fs4a-108" : new google.maps.Marker({
        position: {lat: 28.592797, lng: -81.305181},
        title: '4A Room 108',
        animation: google.maps.Animation.DROP,
        content: '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h1 id="firstHeading" class="firstHeading">4A - Room 108</h1>'+
          '<div id="bodyContent">'+
          '<p>Three Entrances to this building.</p>'+
          '<p>Front</p><p><a href="https://criticalfault.github.io/ClassTracker/Assets/4A_Entrance_1.jpg"> <img class="helpers" src="assets/4A_Entrance_1.jpg"></a></p>'+
          '<p>Secondary Front</p><p> <a href="https://criticalfault.github.io/ClassTracker/Assets/4A_Entrance_1.jpg"><img class="helpers" src="assets/4A_Entrance_2.jpg"></a></p>'+
          '<p>Rear </p><p><a href= "https://criticalfault.github.io/ClassTracker/Assets/4A_Rear_Entrance.jpg"><img class="helpers" src="assets/4A_Rear_Entrance.jpg"></p>'+
          '</div>'+
          '</div>'})},


            //28.592225, -81.304248
          {"fs4a-135" : new google.maps.Marker({
        position: {lat: 28.592225, lng: -81.304248}, 
        title: '4A Room 135',
        animation: google.maps.Animation.DROP,
        content: '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h1 id="firstHeading" class="firstHeading">4A - Room 135</h1>'+
          '<div id="bodyContent">'+
          '<p>Two Entrances to this building.</p>'+
          '<p>Front</p><p><a href="https://criticalfault.github.io/ClassTracker/Assets/4A_136_Entrance.jpg"><img class="helpers" src="assets/4A_136_Entrance.jpg"></a></p>'+
          '<p>Rear </p><p><a href="https://criticalfault.github.io/ClassTracker/Assets/4A_136_Rear_Entrance.jpg"><img class="helpers" src="assets/4A_136_Rear_Entrance.jpg"></a></p>'+
          '</div>'+
          '</div>'})},

          {"fs4a-138" : new google.maps.Marker({
        position: {lat: 28.592225, lng: -81.304248},
        title: '4A Room 138',
        animation: google.maps.Animation.DROP,
        content: '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h1 id="firstHeading" class="firstHeading">4A - Room 138</h1>'+
          '<div id="bodyContent">'+
          '<p>Two Entrances to this building.</p>'+
          '<p>Front</p><p><a href="https://criticalfault.github.io/ClassTracker/Assets/4A_136_Entrance.jpg"><img class="helpers" src="assets/4A_136_Entrance.jpg"></a></p>'+
          '<p>Rear </p><p><a href="https://criticalfault.github.io/ClassTracker/Assets/4A_136_Rear_Entrance.jpg"><img class="helpers" src="assets/4A_136_Rear_Entrance.jpg"></a></p>'+
          '</div>'+
          '</div>'})},

          {"fs4a-139" : new google.maps.Marker({
        position: {lat: 28.592225, lng: -81.304248},
        title: '4A Rooms 139',
        animation: google.maps.Animation.DROP,
        content: '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h1 id="firstHeading" class="firstHeading">4A - Room 139</h1>'+
          '<div id="bodyContent">'+
          '<p>Two Entrances to this building.</p>'+
          '<p>Front</p><p><a href="https://criticalfault.github.io/ClassTracker/Assets/4A_136_Entrance.jpg"><img class="helpers" src="assets/4A_136_Entrance.jpg"></a></p>'+
          '<p>Rear </p><p><a href="https://criticalfault.github.io/ClassTracker/Assets/4A_136_Rear_Entrance.jpg"><img class="helpers" src="assets/4A_136_Rear_Entrance.jpg"></a></p>'+
          '</div>'+
          '</div>'})}
         ];

  });

  if(night == true)
  {
    style = [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ];        
  }
  else
  {
    style = [
              {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "poi.park",
                "elementType": "labels.text.stroke",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              }
            ];
  }


	map = new google.maps.Map(document.getElementById('map'), 
	{
		center: {lat: 28.596257, lng: -81.301963},
		zoom: 17,
    styles: style
	});    

	
}