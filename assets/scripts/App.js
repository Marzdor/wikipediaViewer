$(document).ready(function() {
  $(".srchBtn").on("click", function() {
    search(makeApiCall());
  });
  $('.srchIn').keypress(function(e) {
    var key = e.which;
    if (key == 13) {
      search(makeApiCall());
    }
  });
  $(".srchRnd").on("click", function() {
    window.open('https://en.wikipedia.org/wiki/Special:Random', '_blank');
  });
});

function search(call) {
  $.getJSON(call, function(results) {
    results = results.query.search;
    for (var i = 0; i < results.length; i++) {
      results[i] = {
        "title": results[i].title,
        "snippet": results[i].snippet
      };
      results[i].snippet = results[i].snippet.replace(/\([^()]*\)/g, '');
      results[i].snippet = results[i].snippet.replace(/(<([^>]+)>)/ig, "");
    }
    makePage(results);

    $(".results").on("click", function() {
      var $urlEnd = $(this).find(".resTitle")[0].textContent;
      var url = "https://en.wikipedia.org/wiki/" + $urlEnd;
      window.open(url, '_blank');
    });
  });
}

function makePage(data) {
  $(".container").empty();
  data.forEach(function(page) {
    var $title = $("<h2>").addClass("resTitle").text(page.title);
    var $snippet = $("<p>").addClass("resSnip").text(page.snippet);
    var $resBlock = $("<div>").addClass("results").append($title).append($snippet);
    $(".container").append($resBlock);
  });
}

function makeApiCall() {
  var input = $(".srchIn").val();
  var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&callback=%3F&srsearch=";
  if (input) {
    return (url + input + "&callback=?");
  }
}