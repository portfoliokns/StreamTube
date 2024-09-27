window.onload = function() {
  var multiplayer_start_button = document.getElementById('multiplayer_startbutton');
  var multiplayer_reset_button = document.getElementById('multiplayer_resetbutton');
  var clipplayer_start_button = document.getElementById('clipplayer_startbutton');
  var clipplayer_reset_button = document.getElementById('clipplayer_resetbutton');

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
    var height = document.getElementById('multiplayerheight').value;
    var width = document.getElementById('multiplayerwidth').value;

    setMultiPlayers(videoIDs, startTimes, height, width);
  })

  multiplayer_reset_button.addEventListener('click', function(event) {
    event.preventDefault();

    for (var i = 0; i < 4; i++ ) {
      str = 'multiplayertext' + i
      document.getElementById(str).value = ""
    }
    initMultiPlayers()

    document.getElementById('clipplayer_height').value = "671"
    document.getElementById('clipplayer_width').value = "1192"
  })

  clipplayer_start_button.addEventListener('click', function(event) {
    event.preventDefault();
    
    var url
    var videoID
    url = document.getElementById('clipplayer_url').value
    videoID = url2videoID(url)

    var start = document.getElementById('clipplayer_starttime').value;
    var end = document.getElementById('clipplayer_endtime').value;
    var startTime = time2seconds(start)
    var endTime = time2seconds(end)

    var height = document.getElementById('clipplayer_height').value
    var width = document.getElementById('clipplayer_width').value

    setClipPlayer(videoID, startTime, endTime, height, width)
  })

  clipplayer_reset_button.addEventListener('click', function(event) {
    event.preventDefault();

    document.getElementById('clipplayer_url').value = ""
    document.getElementById('clipplayer_starttime').value = "00:00:00:00"
    document.getElementById('clipplayer_endtime').value = "00:00:03:00"
    document.getElementById('clipplayer_height').value = "671"
    document.getElementById('clipplayer_width').value = "1192"
    initClipPlayer();
    clearInterval(loopInterval);
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

function initClipPlayer() {
  if (player) {
    player.destroy();
    player = null;
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

//ミリ病を数値に変換
function time2seconds(time) {
  const parts = time.split(':').map(Number)
  let seconds = 0;

  // 秒数へ変換
  if (parts.length === 4) {
    seconds += parts[0] * 3600; // 時間を秒に変換
    seconds += parts[1] * 60;   // 分を秒に変換
    seconds += parts[2];        // 秒
    seconds += parts[3] / 100;  // ミリ秒
  }

  return seconds
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
      starTime = startTimes[i]
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
          'start': starTime, //開始時刻 
        },
      });
    }
  }
}

var player;
var loopInterval;
function setClipPlayer(videoId, startTime, endTime, height, width) {
  //プレーヤー/インターバルを初期化
  initClipPlayer();
  clearInterval(loopInterval);

  if (videoId) {
    player = new YT.Player('clipplayer', {
      height: height,
      width: width,
      videoId: videoId,
      playerVars: {
        'autoplay': 1, // 自動再生を有効化
        'loop': 0, // ループ再生
      },
      events: {
        'onReady': function(event) {
          event.target.seekTo(startTime);
          event.target.playVideo();
        },
        'onStateChange': function(event) {
          if (event.data == YT.PlayerState.PLAYING) {
            clearInterval(loopInterval);
            loopInterval = setInterval(function() {
              var currentTime = player.getCurrentTime();
              if (currentTime >= endTime || currentTime < startTime) {
                player.seekTo(startTime);
              }
            },100)  
          } else {
            clearInterval(loopInterval);
          }
        }
      }
    });
  }
}

