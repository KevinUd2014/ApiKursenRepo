
var googlemaps = 
{
  ConvertedCoordinates:[],
  
  map:{},
  geocoder:null,
  initMap:function() 
  {
    googlemaps.geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat:20,lng:-20},//{lat: -34.397, lng: 150.644},
      zoom: 3
    });
  },
  
  getSpotsOnMap:function(currentlabel, geocoderItem)
  {
    
      //var testst = 0;
      var adress = currentlabel.name;
      //testst++;
      var newadress = adress.replace("Location/","");//denna gör så attjag kan hämta från katalogen Location
      googlemaps.geocoder.geocode({'address': newadress},
      function(results, status) 
      {
          if (status === google.maps.GeocoderStatus.OK)//är statusen ok så kör vi denna
          {
            var currentlocation = results[0].geometry.location;
            //var currentObject = currentlabel.snippet;
            //var currentSnippet = ;
            googlemaps.createmarkerOnMap(currentlocation, newadress, geocoderItem);
          } 
          if(status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) 
          {
            setTimeout(function(){
                googlemaps.getSpotsOnMap(currentlabel, geocoderItem);
            }, 200);
            //testst++;
            //console.log("loop"+testst);
            //console.log('Geocode was not successful for the following reason: ' + status);
          }
      });
  },
  createmarkerOnMap:function(currentlocation,newadress, geocoderItem)
  {
    //https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple
    console.log(geocoderItem);
    var contentString = '<b>'+geocoderItem.message+'</b>';//here I put in all the text that will be displayed in a marker position

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    var marker = new google.maps.Marker({
      position: currentlocation,
      map: map,
      title: newadress
    });
    marker.addListener('click', function() {
      
      infowindow.open(map, marker);
      
    });


        //console.log("test");
        
  }
};

