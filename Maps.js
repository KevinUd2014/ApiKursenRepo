var gmaps = 
{
  ConvertedCoordinates:[],
  
  map:{},
  initMap:function() 
  {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat:20,lng:-20},//{lat: -34.397, lng: 150.644},
      zoom: 3
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
      var newadress = adress.replace("Location/","");//denna gör så attjag kan hämta från katalogen Location
      geocoder.geocode({'address': newadress},
      function(results, status) 
      {
          if (status === google.maps.GeocoderStatus.OK)//är statusen ok så kör vi denna
          {
            var currentlocation = results[0].geometry.location;
            gmaps.createmarkerOnMap(currentlocation, newadress);
          } 
          if(status === google.maps.GeocoderStatus.OVER_QUERY_LIMIT) 
          {
            setTimeout(function(){
                gmaps.getSpotsOnMap(currentlabel, geocoder);
            }, 200);
            //testst++;
            //console.log("loop"+testst);
            //console.log('Geocode was not successful for the following reason: ' + status);
          }
      });
  },
  createmarkerOnMap:function(currentlocation,newadress)
  {
    //https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple
    var marker = new google.maps.Marker({
      position: currentlocation,
      map: map,
      title: newadress
    });
    marker.addListener('click', function() {
      
      infowindow.open(map, marker);
      
    });
    var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+ 
      '<h1 id="firstHeading" class="firstHeading">'+newadress+'</h1>'+
      '<div id="bodyContent">'+
      '<p><b>'+newadress+'' +currentlocation+'</b>'+
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
      'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
      '(last visited June 22, 2009).</p>'+
      '</div>'+
      '</div>';

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });


        //console.log("test");
        
  }
};

