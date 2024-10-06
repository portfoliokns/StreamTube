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
  alert('このWayback検索は現在公開されている、あるいは既に非公開・削除されいる動画がWayback Machineに存在するかを検索する機能になります。もし動画が存在すれば、視聴等ができてしまいます。そのため著作権等、法令に基づいての使用が求められます。この検索機能を用いたことによるトラブル・被害・損害等について、このアプリの開発者は一切関与致しません。');
}