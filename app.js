var YOUTUBE_URL = "https://www.youtube.com/watch?v=";

function getApiData(searchTerm, callback) {
  var searchURL = "https://www.googleapis.com/youtube/v3/search";
  var userQuery = {
    part: "snippet",
    key: "AIzaSyAYYvSI0lcTJyC2YRo47qLpn_Vbv22vTE4",
    q: searchTerm,
    maxResults: 5
  };
  $.getJSON(searchURL, userQuery, callback);
}

function displaySearchResults(data) {
  var searchResults = data.items.map(function(item, index) {
    return renderResults(item);
  });
  $("#search-results").html(searchResults);
}

function renderResults(result) {
  return `<div class="video">
  <h3>${result.snippet.title}</h3>
  <p>by <a href="https://www.youtube.com/channel/${result.snippet.channelId}
  " target="_blank">
  ${result.snippet.channelTitle}</a></p>
  <a href="https://www.youtube.com/watch?v=${result.id.videoId}" 
  target="_blank">
  <img src="${result.snippet.thumbnails.medium.url}" 
  alt="${result.snippet.title}"></a>
  </div>`;
}

//Clear results from previous search
function clearResults() {
  $("#search-results").empty();
}

//Event listeners
function watchForSubmission() {
  $("#search-form").submit(function(event) {
    event.preventDefault();
    var searchTerm = $(event.currentTarget)
      .find('input[id="search-term"]')
      .val();
    getApiData(searchTerm, displaySearchResults);
    clearResults();
  });
}

$(function() {
  watchForSubmission();
});
