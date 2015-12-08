var mail = {
  LABELS: [],
  MAILS:[],

  loadGmailApi:function() //vet inte om denna behövs kanske inte!
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
              mail.LABELS.push(resp.labels[i]);
            }
        }
      }
      gmaps.geocodeAddress(mail.LABELS);// we will now use this function
      mail.getallmails();//and the function to get all the mails
    });
  },
  
  getallmails:function()//this function gets all the mails from the email
  {
    var request = gapi.client.gmail.users.messages.list({
      'userId': 'me'
    });
    
    request.execute(function(resp) 
    {
      if (resp.messages && resp.messages.length > 0)
      {
        for (var i = 0; i < resp.messages.length; i++)
        {
          mail.MAILS.push(resp.messages[i]);
          console.log(mail.MAILS);
        }
      }
    });
  },

};