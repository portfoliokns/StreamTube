window.onload = function() {
  var button = document.getElementById('button');

  button.addEventListener('click', function(event) {
    event.preventDefault();

    var videoIDs = []
    var str
    var url
    var videoID
    for (var i = 0; i < 4; i++ ) {
      str = 'multiplayertext' + i
      url = document.getElementById(str).value
      if (!url) {
        videoIDs.push("00000000000");
        continue;
      }
      videoID = url.split("v=")[1].split("&")[0];
      videoIDs.push(videoID);
    }
    height = document.getElementById('multiplayerheight').value
    width = document.getElementById('multiplayerwidth').value

    if (videoIDs) {
      for ( var i = 0; i < videoIDs.length; i++ ) {
        playerId = "multiplayer" + i
        videoId = videoIDs[i]
        player = new YT.Player(playerId, {
          height: height,
          width: width,
          videoId: videoId,
          playerVars: {
            'autoplay': 1, // 自動再生を有効化
            'loop': 1, // ループ再生
          },
        });
      }
    }
  })
  console.log('Web Browser Is Ready');
}

function onYouTubeIframeAPIReady() {
  console.log('YouTube IFrame API Is Ready');
}

