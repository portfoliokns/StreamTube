window.onload = function() {
  var clipplayer_start_button = document.getElementById('clipplayer_startbutton');
  var clipplayer_reset_button = document.getElementById('clipplayer_resetbutton');

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

