"use strict";

// 1. Build a query string
//      form will have: search term entry, number of articles to get, start year for article(optional), end year for article (optional)
// 2. make the API call, format and display the response 
// 3. clear the results 

// listeners: 
// 1. onClick for Search button 
// 2. onClick for Clear button

let apiKey = "c0472e9778e24819951ef447805c93c1";
let queryBase = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}&q=`;
let searchText = $('#searchtext').val().trim();
let startYear = $('#TEXT INPUT BOX ID').val().trim();
let endYear = $('#TEXT INPUT BOX ID').val().trim();

//append search text to the query string
queryBase += searchText;

// if there is a start Year, append it to the query string
if (parseInt(startYear)){
    queryBase += `&begin_date=${startYear}0101`;
}

// if there is an end year, append it to the query string
if (parseInt(endYear)){
    queryBase += `&end_date=${endYear}0101`;
}



