window.onload = function() {
  var clipplayer_start_button = document.getElementById('clipplayer_startbutton');
  var clipplayer_reset_button = document.getElementById('clipplayer_resetbutton');
  var clipplayer_export_button =document.getElementById('clipplayer_exportbutton');
  var clipplayer_import_button =document.getElementById('clipplayer_importbutton');

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

    var height = document.getElementById('player_height').value;
    var width = document.getElementById('player_width').value;

    var clipplayer = document.getElementById('clipplayer_frame');
    clipplayer.style.height = height + "px";
    clipplayer.style.width = width + "px";

    setClipPlayer(videoID, startTime, endTime, height, width)
    applyFilters();
  })

  clipplayer_reset_button.addEventListener('click', function(event) {
    event.preventDefault();

    document.getElementById('clipplayer_url').value = ""
    document.getElementById('clipplayer_starttime').value = "00:00:00:00"
    document.getElementById('clipplayer_endtime').value = "00:01:00:00"
    document.getElementById('player_height').value = "600"
    document.getElementById('player_width').value = "1064"
    initClipPlayer();
    clearInterval(loopInterval);

    resetFilters();
  })

  clipplayer_export_button.addEventListener('click', function(event){
    event.preventDefault();

    var url = document.getElementById('clipplayer_url').value
    var startTime = document.getElementById('clipplayer_starttime').value
    var endTime = document.getElementById('clipplayer_endtime').value
    var height = document.getElementById('player_height').value
    var width = document.getElementById('player_width').value
    if (!url || !startTime || !endTime || !height || !width) {
      alert('パラメータが正しく入力されていません。正しい値を入力してください。')
      return;
    }

    var brightness = document.getElementById('brightness_slider').value
    var contrast = document.getElementById('contrast_slider').value
    var saturate = document.getElementById('saturate_slider').value
    var grayscale = document.getElementById('grayscale_slider').value
    var sepia = document.getElementById('sepia_slider').value
    var hue = document.getElementById('hue_slider').value
    var invert = document.getElementById('invert_slider').value
    var blur = document.getElementById('blur_slider').value
    var opacity = document.getElementById('opacity_slider').value
    changeJson(url, startTime, endTime, height, width, brightness, contrast, saturate, grayscale, sepia, hue, invert, blur, opacity);
  })

  clipplayer_import_button.addEventListener('click', function(event) {
    event.preventDefault();

    var inputFile = document.getElementById('clipplayer_file');
    var file = inputFile.files[0];
    if (!file) {
      alert('ファイルが選択されていません。ファイルを選択しなおしてください。')
      return;
    }

    var reader = new FileReader();
    reader.onload = function(e) {
      try {
          importedHistory = JSON.parse(e.target.result);
          document.getElementById('clipplayer_url').value = importedHistory[0].url;
          document.getElementById('clipplayer_starttime').value = importedHistory[0].startTime;
          document.getElementById('clipplayer_endtime').value = importedHistory[0].endTime;
          document.getElementById('player_height').value = importedHistory[0].height;
          document.getElementById('player_width').value = importedHistory[0].width;

          var brightness = importedHistory[0].brightness;
          var contrast = importedHistory[0].contrast;
          var saturate = importedHistory[0].saturate;
          var grayscale = importedHistory[0].grayscale;
          var sepia = importedHistory[0].sepia;
          var hue = importedHistory[0].hue;
          var invert = importedHistory[0].invert;
          var blur = importedHistory[0].blur;
          var opacity = importedHistory[0].opacity;
          importFilters(brightness, contrast, saturate, grayscale, sepia, hue, invert, blur, opacity);

          clipplayer_start_button.click();
      } catch (error) {
          alert("ファイルの読み込みに失敗しました。JSON形式か確認してください。");
      }
    };
    reader.readAsText(file);
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
          $("#clipplayer").animate({
            left: '0px'
          },400)
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

function changeJson(url, startTime, endTime, height, width, brightness, contrast, saturate, grayscale, sepia, hue, invert, blur, opacity) {
  //保存パラメータを形成
  var history = [{
    url: url,
    startTime: startTime,
    endTime: endTime,
    height: height,
    width: width,
    brightness: brightness,
    contrast: contrast,
    saturate: saturate,
    grayscale: grayscale,
    sepia: sepia,
    hue: hue,
    invert: invert,
    blur: blur,
    opacity: opacity
  }]
  
  //JSON形式に変換
  var jsonContent = JSON.stringify(history, null, 2);
  var blob = new Blob([jsonContent], {type: "application/json"});
  var jsonUrl = URL.createObjectURL(blob);
  
  //JSONファイルをダウンロード
  var link = document.createElement("a");
  link.href = jsonUrl;
  link.download = "export.json";
  link.click();
  
  URL.revokeObjectURL(url);
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

function importFilters(brightness, contrast, saturate, grayscale, sepia, hue, invert, blur, opacity) {
  document.getElementById('brightness_slider').value = brightness;
  document.getElementById('contrast_slider').value = contrast;
  document.getElementById('saturate_slider').value = saturate;
  document.getElementById('grayscale_slider').value = grayscale;
  document.getElementById('sepia_slider').value = sepia;
  document.getElementById('hue_slider').value = hue;
  document.getElementById('invert_slider').value = invert;
  document.getElementById('blur_slider').value = blur;
  document.getElementById('opacity_slider').value = opacity;

  updateBrightness(brightness);
  updateContrast(contrast);
  updateSaturate(saturate);
  updateGrayscale(grayscale);
  updateSepia(sepia);
  updateHueRotate(hue);
  updateInvert(invert);
  updateBlur(blur);
  updateOpacity(opacity);
}