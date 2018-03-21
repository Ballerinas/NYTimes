"use strict";

// 1. Build a query string
//      form will have: search term entry, number of articles to get, start year for article(optional), end year for article (optional)
// 2. make the API call, format and display the response 
// 3. clear the results 

// listeners: 
// 1. onClick for Search button 
// 2. onClick for Clear button

function buildURL(){

let apiKey = "c0472e9778e24819951ef447805c93c1";
let queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}&q=`;
let searchText = $('#search-term').val().trim();
let startYear = $('#start-year').val().trim();
let endYear = $('#end-year').val().trim();

//append search text to the query string
queryURL += searchText;

// if there is a start Year, append it to the query string
if (parseInt(startYear)){
    queryURL += `&begin_date=${startYear}0101`;
}

// if there is an end year, append it to the query string
if (parseInt(endYear)){
    queryURL += `&end_date=${endYear}0101`;
}
console.log(`Query URL is now ${queryURL}`)
return queryURL;

}

function clear() {
    $("#well-section").empty();
    console.log("clear function executed well-section dumped");
  }

$( document ).ready(function(){
    $('#run-search').click(function(event){
        event.preventDefault();
        console.log("search clicked");
        let queryURL = buildURL();
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(updatePage);
        });

    $('#clear-all').click(function(event){
        event.preventDefault();
        console.log("clear clicked");
        clear();
    });
});

function updatePage(NYTData) {
    // get from the form the number of results to display
    // api doesn't have a "limit" parameter, so we have to do this ourselves
    var numArticles = $("#num-records-select").val();
    console.log(numArticles);
  
    // log the NYTData to console, where it will show up as an object
    console.log(NYTData);
    console.log("------------------------------------");
  
    // loop through and build elements for the defined number of articles
    for (var i = 0; i < numArticles; i++) {
  
      // get specific article info for current index
      var article = NYTData.response.docs[i];
  
      // increase the articleCount (track article # - starting at 1)
      var articleCount = i + 1;
  
      // create the HTML well (section) and add the article content for each
      var $articleWell = $("<article>");
      $articleWell.addClass("well");
      $articleWell.attr("id", "article-well-" + articleCount);
  
      // add the newly created element to the DOM
      $("#well-section").append($articleWell);
  
      // if the article has a headline, log and append to $articleWell
      var headline = article.headline;
  
      if (headline && headline.main) {
        console.log(headline.main);
  
        $articleWell.append(
          "<h3 class='articleHeadline'>" +
          "<span class='label label-primary'>" + articleCount + "</span>" +
          "<strong> " + headline.main + "</strong></h3>"
        );
      }
  
      // if the article has a byline, log and append to $articleWell
      var byline = article.byline;
  
      if (byline && byline.original) {
        console.log(byline.original);
  
        $articleWell.append("<h5>" + byline.original + "</h5>");
      }
  
      // log section, and append to document if exists
      var section = article.section_name;
      console.log(article.section_name);
      if (section) {
        $articleWell.append("<h5>Section: " + section + "</h5>");
      }
  
      // log published date, and append to document if exists
      var pubDate = article.pub_date;
      console.log(article.pub_date);
      if (pubDate) {
        $articleWell.append("<h5>" + article.pub_date + "</h5>");
      }
  
      // append and log url
      $articleWell.append(
        "<a href='" + article.web_url + "'>" + article.web_url + "</a>"
      );
      console.log(article.web_url);
    }
  } 