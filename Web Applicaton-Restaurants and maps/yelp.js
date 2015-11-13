var mapDiv;
var mapOptions;
var map;
var markers=[];

function initialize() {
    mapDiv = document.getElementById("map");
    document.getElementById("display_list").innerHTML+= " ";
    document.getElementById("ddd").innerHTML+= " ";
    document.getElementById("title").innerHTML+= " ";
    document.getElementById("snippet").innerHTML+= " ";
    mapOptions = 
		{
  				center: new google.maps.LatLng(32.75, -97.13),
  				zoom: 16,
  				mapTypeId: google.maps.MapTypeId.ROADMAP
		};
	map = new google.maps.Map(mapDiv,mapOptions);

}



function sendRequest () {
    
 
     var search = document.getElementById("search").value;
    var newViewport = map.getBounds();
    var southWest = newViewport.getSouthWest();
    var swlat = southWest.lat();
    var swlng = southWest.lng();
    var northEast = newViewport.getNorthEast();
    var nelat = northEast.lat();
    var nelng = northEast.lng();
    var query = document.getElementById("search").value;
   var xhr = new XMLHttpRequest();
    xhr.open("GET", "proxy.php?term="+search+"&bounds="+swlat+","+swlng+"|"+nelat+","+nelng+"&limit="+10);
   //xhr.open("GET", "proxy.php?term=mexican+restaurant&location=Arlington+Texas&limit=10");
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            var businesses = json.businesses;
          //  console.log(businesses.length)
            var str = JSON.stringify(json,undefined,2);
            document.getElementById("ddd").innerHTML=" ";
            accessBusinesses(businesses);
            //document.getElementById("output").innerHTML = "<pre>" + str + "</pre>";

       }
   };
   xhr.send(null);
}

function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function deleteMarkers() {
  clearMarkers();
  markers = [];
}

function clearMarkers() {
  setMapOnAll(null);
}
function accessBusinesses(restaurants){
    var displayList = document.getElementById("title");
    var count = 0;
    var latitude;
    var locations = [];
    var coord;
    var marker;
    var myLatLng;
    deleteMarkers(); 
    var counter = 0;
    var longitude;
    //removeMarkers(restaurants.length);
    displayList.innerHTML="<h2><b><u>Restaurants</u></b></h2>";
    var myList = document.getElementById("ddd"); 
    myList.innerHTML+= "<ol>";
    for(var i=0; i<restaurants.length; i++){
        count = i+1;
        name = restaurants[i].name;
     
        coord = restaurants[i].location.coordinate;
         latitude = coord.latitude;
         longitude = coord.longitude;
        locations.push({ latlng: new google.maps.LatLng(latitude,longitude)});
        
        myList.innerHTML+="<li><h4>"+count+".&nbsp;<img align=top src="+restaurants[i].image_url+">&nbsp;&nbsp<a  href="+restaurants[i].url+">"+name+"</a><p>"+restaurants[i].snippet_text+"</p></br><img vertical-align= middle src="+restaurants[i].rating_img_url +"></h4></li>";
        myList.innerHTML+="<hr align=left width=800px>";
        myList.innerHTML+="</ol>";
    }
    var bounds = new google.maps.LatLngBounds();
    for(var i=0; i<restaurants.length; i++){
        counter = i+1;
        console.log(counter)
        var string = counter.toString();
        var marker = new google.maps.Marker({position: locations[i].latlng,
                                            map:map,
                                            label:string
                                            });
       
        bounds.extend( locations[i].latlng)
         markers.push(marker);
    }
    map.fitBounds(bounds);
}