max_players = 4;
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
    for (var i = 0; i < max_players; i++ ) {
      str = 'multiplayertext' + i;
      url = document.getElementById(str).value;
      videoID = url2videoID(url);
      if (!videoID) continue;
      videoIDs.push(videoID);
      startTime = url2startTime(url);
      startTimes.push(startTime);
    }

    multiplayers = document.querySelectorAll(".multiplayer")
    for ( var i = 0; i < max_players; i++ ) {
      multiplayers[i].style.height = "0px";
      multiplayers[i].style.width = "0px";
    }

    var height = document.getElementById('player_height').value;
    var width = document.getElementById('player_width').value;

    for ( var i = 0; i < videoIDs.length; i++ ) {
      multiplayers[i].style.height = height + "px";
      multiplayers[i].style.width = width + "px";
    }
    setMultiPlayers(videoIDs, startTimes, height, width);
  })

  multiplayer_reset_button.addEventListener('click', function(event) {
    event.preventDefault();

    for (var i = 0; i < max_players; i++ ) {
      str = 'multiplayertext' + i
      document.getElementById(str).value = ""
    }
    initMultiPlayers()

    document.getElementById('player_height').value = "366"
    document.getElementById('player_width').value = "650"
    multiplayers = document.querySelectorAll(".multiplayer")
    for ( var i = 0; i < max_players; i++ ) {
      multiplayers[i].style.height = "0px";
      multiplayers[i].style.width = "0px";
    }

  })

  console.log('Web Browser Is Ready');
}

function onYouTubeIframeAPIReady() {
  console.log('YouTube IFrame API Is Ready');
}

function initMultiPlayers() {
  for ( var i = 0; i < max_players; i++ ) {
    if (players[i]) {
      players[i].destroy();
      players[i] = null;
    }
  }
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
    for ( var i = 0; i < videoIDs.length; i++ ) {
      playerId = "multiplayer" + i
      playerName = "#multiplayer" + i
      videoId = videoIDs[i]
      startTime = startTimes[i]
      if (!videoId) {
        return;
      }
      setPlayer(i, videoId, startTime, height, width,playerName)
    }
  }
}

function setPlayer(i, videoId, startTime, height, width,playerName) {
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
    events: {
      'onReady': function(event) {
        event.target.seekTo(startTime);
        event.target.playVideo();
        $(playerName).animate({
          left: '0px'
        },400)
      },
    }
  });
}