"use strict";

// 1. Build a query string
//      form will have: search term entry, number of articles to get, start year for article(optional), end year for article (optional)
// 2. make the API call, format and display the response 
// 3. clear the results 

// listeners: 
// 1. onClick for Search button 
// 2. onClick for Clear button

let queryBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=c0472e9778e24819951ef447805c93c1&q=";
let searchText = $('#searchtext').val().trim();
let numArticles = $('#dropdown').val().parseInt();
let startYear = $('#TEXT INPUT BOX ID').trim().val().parseInt();
let endYear = $('#TEXT INPUT BOX ID').trim().val().parseInt();



