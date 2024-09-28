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
    applyFilters();
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

    resetFilters();
    // document.getElementById('brightness_slider').value = initBrightness;
    // document.getElementById('contrast_slider').value = initContrast;
    // document.getElementById('saturate_slider').value = initSaturate;
    // document.getElementById('grayscale_slider').value = initGrayscale;
    // document.getElementById('sepia_slider').value = initSepia;
    // document.getElementById('hue_slider').value = initHueRotate;
    // document.getElementById('invert_slider').value = initInvert;
    // document.getElementById('blur_slider').value = initBlurred;
    // document.getElementById('opacity_slider').value = initOpacity;

    // updateBrightness(initBrightness);
    // updateContrast(initContrast);
    // updateSaturate(initSaturate);
    // updateGrayscale(initGrayscale);
    // updateSepia(initSepia);
    // updateHueRotate(initHueRotate);
    // updateInvert(initInvert);
    // updateBlur(initBlurred);
    // updateOpacity(initOpacity);
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

var initBrightness = 1;
var initContrast = 1;
var initSaturate = 1;
var initGrayscale = 0;
var initSepia = 0;
var initHueRotate = 0;
var initInvert = 0;
var initBlurred = 0;
var initOpacity = 1;

var brightness = initBrightness;
var contrast = initContrast;
var saturate = initSaturate;
var grayscale = initGrayscale;
var sepia = initSepia;
var hueRotate = initHueRotate;
var invert = initInvert;
var blurred = initBlurred;
var opacity = initOpacity;

function applyFilters() {
  document.getElementById('clipplayer').style.filter = 
    'brightness(' + brightness + ') ' +
    'contrast(' + contrast + ') ' +
    'saturate(' + saturate + ') ' +
    'grayscale(' + grayscale + ')' +
    'sepia(' + sepia + ')' + 
    'hue-rotate(' + hueRotate + ')' +
    'invert(' + invert + ')' +
    'blur(' + blurred + ')' +
    'opacity(' + opacity + ')';
}

// 各スライダーの値を更新してフィルターを適用
function updateBrightness(value) {
  brightness = value;
  applyFilters();
}

function updateContrast(value) {
  contrast = value;
  applyFilters();
}

function updateSaturate(value) {
  saturate = value;
  applyFilters();
}

function updateGrayscale(value) {
  grayscale = value;
  applyFilters();
}

function updateSepia(value) {
  sepia = value;
  applyFilters();
}

function updateHueRotate(value) {
  hueRotate = value + 'deg';
  applyFilters();
}

function updateInvert(value) {
  invert = value;
  applyFilters();
}

function updateBlur(value) {
  blurred = value + 'px';
  applyFilters();
}

function updateOpacity(value) {
  opacity = value;
  applyFilters();
}

function resetFilters() {
  document.getElementById('brightness_slider').value = initBrightness;
  document.getElementById('contrast_slider').value = initContrast;
  document.getElementById('saturate_slider').value = initSaturate;
  document.getElementById('grayscale_slider').value = initGrayscale;
  document.getElementById('sepia_slider').value = initSepia;
  document.getElementById('hue_slider').value = initHueRotate;
  document.getElementById('invert_slider').value = initInvert;
  document.getElementById('blur_slider').value = initBlurred;
  document.getElementById('opacity_slider').value = initOpacity;

  updateBrightness(initBrightness);
  updateContrast(initContrast);
  updateSaturate(initSaturate);
  updateGrayscale(initGrayscale);
  updateSepia(initSepia);
  updateHueRotate(initHueRotate);
  updateInvert(initInvert);
  updateBlur(initBlurred);
  updateOpacity(initOpacity);
}