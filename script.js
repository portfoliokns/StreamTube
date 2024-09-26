var player = []
window.onload = function() {
  var multiplayer_start_button = document.getElementById('multiplayer_startbutton');
  var multiplayer_reset_button = document.getElementById('multiplayer_resetbutton');

  multiplayer_start_button.addEventListener('click', function(event) {
    event.preventDefault();

    var videoIDs = []
    var str
    var url
    var videoID
    var startTime
    for (var i = 0; i < 4; i++ ) {
      str = 'multiplayertext' + i
      url = document.getElementById(str).value
      if (!url) {
        continue;
      } else if (url.includes('?v=')) {
        videoID = url.split("?v=")[1].split("&")[0];
        if (url.includes('&t=')) {
          startTime = url.split("&t=")[1].replace("s","")
        }
      } else if (url.includes('?si=')) {
        videoID = url.split("?si=")[0].split("/")[3];
        if (url.includes('&t=')) {
          startTime = url.split("&t=")[1].replace("s","")
        }
      }
      videoIDs.push(videoID);
    }
    height = document.getElementById('multiplayerheight').value
    width = document.getElementById('multiplayerwidth').value

    setMultiPlayers(videoIDs, startTime)
  })

  multiplayer_reset_button.addEventListener('click', function(event) {
    event.preventDefault();

    for (var i = 0; i < 4; i++ ) {
      str = 'multiplayertext' + i
      document.getElementById(str).value = ""
    }
    initPlayers()

    document.getElementById('multiplayerheight').value = "366"
    document.getElementById('multiplayerwidth').value = "650"
  })

  console.log('Web Browser Is Ready');
}

function onYouTubeIframeAPIReady() {
  console.log('YouTube IFrame API Is Ready');
}

function initPlayers() {
  for ( var i = 0; i < 4; i++ ) {
    if (player[i]) {
      player[i].destroy();
      player[i] = null;
    }
  }
}

function setMultiPlayers(videoIDs,startTime) {
  initPlayers()
  if (videoIDs) {

    for ( var i = 0; i < videoIDs.length; i++ ) {
      playerId = "multiplayer" + i
      videoId = videoIDs[i]
      if (!videoId) {
        continue;
      }
      player[i] = new YT.Player(playerId, {
        height: height,
        width: width,
        videoId: videoId,
        playerVars: {
          'autoplay': 1, // 自動再生を有効化
          'loop': 1, // ループ再生
          'playlist': videoId, //プレイリスト
          'start': startTime, //開始時刻 
        },
      });
    }
  }
}

