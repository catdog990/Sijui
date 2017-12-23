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
			var artCard = `
				
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
			$foxUlPanel.append(artCard);
		}
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

});