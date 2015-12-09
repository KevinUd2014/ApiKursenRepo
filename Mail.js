var mail = {

  loadTheGmailApi:function() //vet inte om denna behövs kanske inte!
  {
    gapi.client.load('gmail', 'v1', mail.getLabels);
  },

  getLabels:function() 
  {
    //console.log("vad som helst")
    var request = gapi.client.gmail.users.labels.list({
      'userId': 'me'
    });

    request.execute(function(resp) 
    {
      if (resp.labels && resp.labels.length > 0) 
      {
        for (var i = 0; i < resp.labels.length; i++) //for every label in the location we do this
        {
            if(resp.labels[i].name.indexOf("Location/") > -1)//This sorts every label in my location folder
            {
              mail.getallmails(resp.labels[i]);
              //mail.LABELS.push(resp.labels[i]);
            }
        }
      }
      //setTimeout(function() {gmaps.geocodeAddress(mail.TOTALMAIL);}, 3000);//put on a timer after 3 seconds 
      //gmaps.geocodeAddress(mail.LABELS);// we will now use this function
      //mail.getallmails();//and the function to get all the mails
    });
  },
  
  getallmails:function(label)//this function gets all the mails from the email
  {
    var request = gapi.client.gmail.users.messages.list({
      'userId': 'me',
      'labelIds': label.id
    });
      
      request.execute(function(resp) 
      {
        for (var i = 0; i < resp.messages.length; i++) {
          var message = resp.messages[i];
          
          mail.getMail(message,label);
      }
    });
  },
  getMail:function(message, label){//and this email gets every specific email with the message!
    var request = gapi.client.gmail.users.messages.get({
            'userId': 'me',
            'id': message.id
            });
            
          request.execute(function(response){
            
              var message = response.payload.parts[1].body.data;

              //console.log(response);//had to console log the response

              if(message === undefined)//if a message is undefined look for it in another part!!
              {
                message = response.payload.parts[0].parts[1].body.data;//there is one email that's in another part of the gmail so this is needed or there will be an error!//Got some help with this one!
              }
            
              message = window.atob(message.replace(/-/g, '+').replace(/_/g, '/')); //This replaces some important characters in gmail.//got this from one in the class!!
            
              var geocoderItem = 
              {
                  subject:response.payload.headers[16].value,
                  snippet:response.snippet,
                  message: message,
              };
              googlemaps.getSpotsOnMap(label, geocoderItem);
          });
  },

};
