$(document).ready(function(){

	var $foxPanel = $('#foxPanel');
	var $foxUlPanel = $foxPanel.find('.artPanel');

	/******************************
	 * 			FOX API
	 ******************************/

	// Fox URL endpoint to reach API
	var foxURL = "https://newsapi.org/v2/top-headlines?sources=fox-news&apiKey=e3f5ca683b4d4dc3b83b2d824133cc6e"

	// AJAX call to Fox News API
	$.ajax({
		url: foxURL,
		method:'GET'
	}).done(function (foxRes){
		// Console.log entire response object
		console.log(`FOX response: ${foxRes}`);

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
					<div class="article-title collapsible-header a-headline"><i class="material-icons">arrow_drop_down</i>${foxTitle}</div>
					<div class="collapsible-body a-body">
						<span>${foxDesc}</span>
						<img src="http:${slicedUrlStr}" class="responsive-img" alt="Picture for article">
						<br>
						<div class="a-btns">
							<button class="btn teal waves-effect waves-light">Read Later</button>
							<a href="${foxLink}" target="_blank"><button class="btn black waves-effect waves-light">Full Story</button></a>
						</div>                        
					</div>
				</li>`;
			
			// Append HTML string to the panel
			$foxUlPanel.append(artCard);
		}
	});

});