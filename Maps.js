var gmaps = 
{
  ConvertedCoordinates:[],
  
  map:{},
  initMap:function() 
  {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat:50,lng:15},//{lat: -34.397, lng: 150.644},
      zoom: 2
    });
  },
  
 geocodeAddress:function(labels) {
    var geocoder = new google.maps.Geocoder();
    
      for(var i=0; i < labels.length; i++)
      {
          gmaps.getSpotsOnMap(labels[i],geocoder);
      }
  },
  
  getSpotsOnMap:function(currentlabel,geocoder)
  {
      //var testst = 0;
      var adress = currentlabel.name;
      //testst++;
      var newadress = adress.replace("Location/","");
      geocoder.geocode({'address': newadress},
      function(results, status) 
      {
          if (status === google.maps.GeocoderStatus.OK)
          {
            var currentloc = results[0].geometry.location;
            gmaps.createmarkerOnMap(currentloc);
          } 
          if(status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) 
          {
            setTimeout(function(){
                gmaps.getSpotsOnMap(currentlabel, geocoder);
            }, 200);
            //testst++;
            //console.log("loop"+testst);
            console.log('Geocode was not successful for the following reason: ' + status);
          }
      });
  },
  createmarkerOnMap:function(currentloc,newadress)
  {
          var marker = new google.maps.Marker({
          position: currentloc,
          map: map,
          title: newadress
        });
        //console.log("hej");
        //https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple
  }
};

