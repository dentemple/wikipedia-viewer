$(document).ready(initializePage);
function initializePage() {
  
  $('#search-field').keyup (function() {
    callSearchAPI();
  });
  
  $("form").on('submit', function (e) {
    callSearchAPI();
    e.preventDefault();
  });

}

function callSearchAPI(){
  var searchTerm = $('#search-field').val(); 
  $.ajax({
    url: 'https://en.wikipedia.org/w/api.php',
    dataType: 'jsonp',
    jsonp: "callback",
    data: {
      action: 'query',
      format: 'json',
      prop: 'extracts',
      exchars: '200',
      exlimit: 'max',
      explaintext: '',
      exintro: '',
      pilimit: 'max',
      rawcontinue: '',
      generator: 'search',
      gsrsearch: searchTerm,
      gsrnamespace: '0',
      gsrlimit: '8'
    },
    success: function(data) {
      sendToPage(data.query.pages);
    }
  });
}

function sendToPage(results) {
  $('#search-section').empty();
  var resultHTML = "";
  for (var result in results) {
    resultHTML += '<article class="well"><div class="row"><div class="col-xs-12">';
    resultHTML += '<a target="_blank" href="https://en.wikipedia.org/?curid='; 
    resultHTML += results[result].pageid;
    resultHTML += '"><h3 class="article-title">';
    resultHTML += JSON.stringify(results[result].title).replace(/"/g,"");
    resultHTML += '</h3></a><p class="article-text">';
    resultHTML += JSON.stringify(results[result].extract);
    resultHTML += '</p></div></div></article></a>';
  }
  $('#search-section').append(resultHTML);
}