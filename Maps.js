var gmaps = 
{
  ConvertedCoordinates:[],
  
  map:{},
  initMap:function() 
  {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat:50,lng:15},
      zoom: 2
    });
  },

  geocodeAddress:function(labels) {
    var geocoder = new google.maps.Geocoder();
    var i = 0;
    
    //var country = "Sweden";
    //var geocoder;

    //geocoder.geocode( {'address' : country}, function(results, status) {
    //   if (status == google.maps.GeocoderStatus.OK) 
    //   {
    //        map.setCenter(results[0].geometry.location);
    //    }
    //});
    
     setTimeout(function () 
    {
      if (i < labels.length) {
        gmaps.createMarkers(labels[i],geocoder);
      }
      i++; 
    }, 300);
  },
  
  createMarkers:function(currentlabel,geocoder)
  {
      var adress = currentlabel.name;
      var newadress = adress.replace("Location:","");
      console.log(newadress);
      geocoder.geocode({'address': newadress}, 
      function(results, status) 
      {
          if (status === google.maps.GeocoderStatus.OK)
          {
            console.log(results);
            //console.log(results[0].place_id);
            var currentloc = results[0].geometry.location;

            gmaps.putMarkerOnMap(currentloc);
          } 
          else 
          {
            alert('Geocode was not successful for the following reason: ' + status);
          }
      });
  },
  putMarkerOnMap:function(currentloc)
  {
          var marker = new google.maps.Marker({
          position: currentloc,
          map: map,
          title: 'Hello World!'
        });
  },
};