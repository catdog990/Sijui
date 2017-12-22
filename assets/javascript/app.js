$(document).ready(function() {


var numResults = 0;
var startDate = 0;
var currentDate = 0;
//limit to 3 articles per pull
var articleCounter = 0;

//function to tract amount of articles pulled
function runQuery(numArticles, queryURL) {





//ajax call to pull most shared articles from nytimes
var url = "https://api.nytimes.com/svc/mostpopular/v2/mostshared/all-sections/1.json";
url += '?' + $.param({
  'api-key': "f09c13f1ab334133b59ab848df8991cd"
});
$.ajax({
  url: queryURL,
  method: 'GET',
}).done(function(result) {
  console.log(result);
}).fail(function(err) {
  throw err;
});

result();

$("<#articleDiv>").append();

}

});