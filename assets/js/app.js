$(document).ready(function(){

	// Initialize Firebase
	var config = {
	apiKey: "AIzaSyB6eP0j1WYKAW7LMMFeH5deH4R7D21fWuM",
	authDomain: "my-firebase-proj-45c06.firebaseapp.com",
	databaseURL: "https://my-firebase-proj-45c06.firebaseio.com",
	projectId: "my-firebase-proj-45c06",
	storageBucket: "my-firebase-proj-45c06.appspot.com",
	messagingSenderId: "205248542343"
	};
	firebase.initializeApp(config);

	// Hold the database in a variable
	var db = firebase.database();
	
	// Reference the database
	var dbRef =	 db.ref();

	// DOM Caching
	var $container = $('.container');
	var $foxPanel = $('#foxPanel');
	var $foxUlPanel = $foxPanel.find('.artPanel');
	var $readLaterSec = $('#readLaterSec');
	var $readLaterSecUl = $readLaterSec.find('ul');

	/******************************
	 * 			FOX API
	 ******************************/

	// Fox URL endpoint to reach API
	var foxURL = "https://newsapi.org/v2/top-headlines?sources=fox-news&apiKey=e3f5ca683b4d4dc3b83b2d824133cc6e";

	// AJAX call to Fox News API
	$.ajax({
		url: foxURL,
		method:'GET'
	}).done(function (foxRes){
		// Console.log entire response object
		console.log('FOX News Response obj');
		console.log(foxRes);

		// Filter number of articles to display to user
		var numArts = 3;

		// Loop through the response object to retrieve only the info we need (headline, summary, img url and full art url)
		for (var i = 0; i < numArts; i++){
			var foxTitle = foxRes.articles[i].title;
			var foxDesc = foxRes.articles[i].description;
			var foxLink = foxRes.articles[i].url;
			var foxImgUrl = foxRes.articles[i].urlToImage;
			
			// Working with the imgUrl to format it correctly
			// Find the parameters "?"
			var paramIndex = foxImgUrl.indexOf("?");
			// Remove everything after the "?"
			var slicedUrlStr = foxImgUrl.slice(0 , paramIndex);

			// HTML string to create panel
			var foxCard = `
				
				<li>
					<div class="article-title collapsible-header a-headline">
						<div class="logo"></div>
						<p class="a-title">${foxTitle}</p>
						<i class="material-icons">arrow_drop_down</i>
					</div>
					<div class="collapsible-body a-body">
						<span class="a-desc">${foxDesc}</span>
						<img src="http:${slicedUrlStr}" class="responsive-img" alt="Picture for article">
						<br>
						<div class="a-btns">
							<button class="readLater btn teal waves-effect waves-light">Read Later</button>
							<a href="${foxLink}" target="_blank"><button class="btn black waves-effect waves-light">Full Story</button></a>
						</div>                        
					</div>
				</li>`;
			
			// Append HTML string to the panel
			$foxUlPanel.append(foxCard);
		}
	});

	//***************************** //
//		        Buzzfeed API

// // ***************************** //


	// var buzzURL = "https://newsapi.org/v2/top-headlines?sources=buzzfeed&apiKey=e3f5ca683b4d4dc3b83b2d824133cc6e";

	// AJAX call to Buzzfedd API //

	// $.ajax({
	// 	url: buzzURL,
	// 	method:'GET'
	// }).done(function (buzzRes){
	// 	// Console.log entire response object
	// 	console.log('Buzzfedd Response obj');
	// 	console.log(buzzRes);

	// 	var articleNumber = 3;


	// for (var i = 0; i < articleNumber; i++){

	// 		var buzzTitle = buzzRes.articles[i].title;
	// 		var buzzDesc = buzzRes.articles[i].description;
	// 		var buzzLink = buzzRes.articles[i].url;
	// 		var buzzImgURL = buzzRes.articles[i].urlToImage;
	
	// console.log("1 " + buzzTitle);
	// console.log("1 " + buzzDesc);
	// console.log("1 " + buzzLink);
	// console.log("1 " + buzzImgURL);

		// }

	// // ********************** //
	// 			ESPN API
		
	// // ********************** //


	// ESPN URL endpoint for API //
		var espnURL = "https://newsapi.org/v2/top-headlines?sources=espn&apiKey=e3f5ca683b4d4dc3b83b2d824133cc6e"


	$.ajax({
			url: espnURL,
			method:'GET'
		}).done(function (espnRes){
			// Console.log entire response object
			console.log('ESPN Response obj');
			console.log(espnRes);

			var articleNumber = 3;


	// Loop through 3 articles //
	for (var i = 0; i < articleNumber; i++){

				var espnTitle = espnRes.articles[i].title;
				var espnDesc = espnRes.articles[i].description;
				var espnLink = espnRes.articles[i].url;
				var espnImgURL = espnRes.articles[i].urlToImage;


		// Creating Panel and appending it to page //

		var espnPanel = $('#espnPanel');
		var espnUlPanel = espnPanel.find('.artPanel');

		var espnCard = `
				
				<li>
					<div class="article-title collapsible-header a-headline">
						<div class="logo"></div>
						<p class="a-title">${espnTitle}</p>
						<i class="material-icons">arrow_drop_down</i>
					</div>
					<div class="collapsible-body a-body">
						<span class="a-desc">${espnDesc}</span>
						<img src="${espnImgURL}" class="responsive-img" alt="Picture for article">
						<br>
						<div class="a-btns">
							<button class="readLater btn teal waves-effect waves-light">Read Later</button>
							<a href="${espnLink}" target="_blank"><button class="btn black waves-effect waves-light">Full Story</button></a>
						</div>                        
					</div>
				</li>`;

				// Append HTML string to the panel // 
					espnUlPanel.append(espnCard);


		};
			

	});

	/********************
 	*	Firebase
	*******************/
	function readLater(e) {
		var target = $(e.target);
		var rlArt = target.closest('li');
		var rlTitle = rlArt.find('.a-title');
		var rlDesc = rlArt.find('.a-desc');
		var rlUrl = rlArt.find('.a-btns a');

		var rlArtObj = {
			title: rlTitle.text(),
			description: rlDesc.text(),
			url: rlUrl.attr('href')
		}
		
		dbRef.push(rlArtObj);
	}

	// db Event Binding
	dbRef.on("child_added", function(snapshot){
		var rlArt = `
		<li>
			<div class="article-title collapsible-header rl-a-headline">
				<p class="a-title">${snapshot.val().title}</p>
				<i class="material-icons">arrow_drop_down</i>
			</div>
			<div class="collapsible-body a-body">
				<span class="a-desc">${snapshot.val().description}</span>
				<br>
				<div class="a-btns">
					<a href="${snapshot.val().url}" target="_blank"><button class="btn black waves-effect waves-light">Full Story</button></a>
				</div>                        
			</div>
		</li>`
		console.log(snapshot.val());
		$readLaterSecUl.append(rlArt);
	})

	// Event Binding
	$container.on('click', 'button.readLater', readLater);
	
	//read page button
	$("#mini-play-all").click(function() {
		//text body variable
		var bodyText = $("#test-P");
		//speak text audibly 
		responsiveVoice.speak(bodyText);
	});
	
	$().click();

});





	  // //limit to 3 articles per pull
	  // var authKey = "f09c13f1ab334133b59ab848df8991cd"
	  // var url = "https://api.nytimes.com/svc/mostpopular/v2/mostshared/all-sections/1.json?api-key=" + authKey;
	  // //function to tract amount of articles pulled
	  // //ajax call to pull most shared articles from nytimes
	  // $.ajax({
	  //   url: url,
	  //   method: 'GET',
	  // }).done(function (response) {
	  //       // Here you work with the response obj from the NYT API
	  //   var numArt = 3;
	  //   for (var i = 0; i < numArt; i++) {
	  //     //response.results[i].title;
	      
	  //     var title = response.results[i].title;
	  //     var desc = response.results[i].abstract;
	  //     var link = response.results[i].url;
	  //     var isImg = response.results[i].media;
	  //     var imgUrl = 'No img today';
		  
	  //       if(isImg != ''){
	  //         imgUrl = (response.results[i].media[0])["media-metadata"][0];
	  //       }
	  //       console.log(imgUrl);
	  //       $("#article-div").append(title + desc + link)
	  //       $('#jp').html(imgUrl);
	
	  //   }
	
	  // }).fail(function (err) {
	  //   throw err;
	  // });