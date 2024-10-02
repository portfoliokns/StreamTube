window.onload = function() {
  var multiplayer_start_button = document.getElementById('multiplayer_startbutton');
  var multiplayer_reset_button = document.getElementById('multiplayer_resetbutton');

  multiplayer_start_button.addEventListener('click', function(event) {
    event.preventDefault();

    var videoIDs = []
    var startTimes = []
    var str
    var url
    var videoID
    var startTime
    for (var i = 0; i < 4; i++ ) {
      str = 'multiplayertext' + i;
      url = document.getElementById(str).value;
      videoID = url2videoID(url);
      videoIDs.push(videoID);
      startTime = url2startTime(url);
      startTimes.push(startTime);
    }
    var height = document.getElementById('player_height').value;
    var width = document.getElementById('player_width').value;

    setMultiPlayers(videoIDs, startTimes, height, width);
  })

  multiplayer_reset_button.addEventListener('click', function(event) {
    event.preventDefault();

    for (var i = 0; i < 4; i++ ) {
      str = 'multiplayertext' + i
      document.getElementById(str).value = ""
    }
    initMultiPlayers()

    document.getElementById('player_height').value = "671"
    document.getElementById('player_width').value = "1192"
  })

  console.log('Web Browser Is Ready');
}

function onYouTubeIframeAPIReady() {
  console.log('YouTube IFrame API Is Ready');
}

function initMultiPlayers() {
  for ( var i = 0; i < 4; i++ ) {
    if (players[i]) {
      players[i].destroy();
      players[i] = null;
    }
  }
}

function url2videoID(url){
  var videoID = ""
  if (url.includes('?v=')) {
    videoID = url.split("?v=")[1].split("&")[0];
  } else if (url.includes('?si=')) {
    videoID = url.split("?si=")[0].split("/")[3];
  }
  return videoID;
}

function url2startTime(url) {
  var startTime = 0
  if (url.includes('?v=') & url.includes('&t=')) {
    startTime = url.split("&t=")[1].replace("s","")
  } else if (url.includes('?si=') & url.includes('&t=')) {
    startTime = url.split("&t=")[1].replace("s","")
  }
  return startTime;
}

var players = [];
function setMultiPlayers(videoIDs, startTimes, height, width) {
  initMultiPlayers()
  if (videoIDs) {
    var playerId
    var startTime
    for ( var i = 0; i < videoIDs.length; i++ ) {
      playerId = "multiplayer" + i
      videoId = videoIDs[i]
      startTime = startTimes[i]
      if (!videoId) {
        continue;
      }
      players[i] = new YT.Player(playerId, {
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