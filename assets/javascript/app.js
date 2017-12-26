$(document).ready(function () {

  //limit to 3 articles per pull
  var authKey = "f09c13f1ab334133b59ab848df8991cd"
  var url = "https://api.nytimes.com/svc/mostpopular/v2/mostshared/all-sections/1.json?api-key=" + authKey;
  //function to tract amount of articles pulled

  //ajax call to pull most shared articles from nytimes
  $.ajax({
    url: url,
    method: 'GET',
  }).done(function (response) {
        // Here you work with the response obj from the NYT API
    var numArt = 3;
    for (var i = 0; i < numArt; i++) {
      //response.results[i].title;
      console.log(response);
      var title = response.results[i].title;
      var desc = response.results[i].abstract;
      var link = response.results[i].url;
      var isImg = response.results[i].media;
      var imgUrl = 'No img today';
      
        if(isImg != ''){
          imgUrl = (response.results[i].media[0])["media-metadata"][0];
        }
        console.log(imgUrl);
        $("#article-div").append(title + desc + link)
        $('#jp').html(imgUrl);

    }

  }).fail(function (err) {
    throw err;
  });

  

});