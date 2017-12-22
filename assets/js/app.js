$(document).ready(function(){

	// **********Fox API!!!!*******//




var queryURL = "https://newsapi.org/v2/top-headlines?sources=fox-news&apiKey=e3f5ca683b4d4dc3b83b2d824133cc6e"

$.ajax({
	url: queryURL,
	method:'GET'
}).done(function (response){
	console.log(response);



var numbahArt = 3;

for (var i = 0; i < numbahArt; i++){
	var title = response.articles[i].title;
	var description = response.articles[i].description;
	var link = response.articles[i].url;
	console.log("1 " + title);
	console.log("2 " + description);
	console.log("3 " + link);
}

});

});