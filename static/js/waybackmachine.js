window.onload = function() {
  wayback_url = document.getElementById("wayback_url");
  wayback_search_button = document.getElementById("wayback_search_button");

  wayback_search_button.addEventListener("click", function(event) {
    event.preventDefault();

    var url = wayback_url.value
    if (!url) return
    
    videoID = url2videoID(url);
    url = "https://web.archive.org/web/2oe_/http://wayback-fakeurl.archive.org/yt/" + videoID;
    window.open(url, '_blank')

  })

  console.log('Web Browser Is Ready');
}