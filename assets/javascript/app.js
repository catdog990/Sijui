$(document).ready(function () {
  console.log("pls");

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
      response.results[i].title;
      console.log(response.results[i].title);

    }

    // articleCount = [0, 1, 2]

  }).fail(function (err) {
    throw err;
  });

});