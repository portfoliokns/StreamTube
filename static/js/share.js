var height = document.getElementById('player_height')
var heightSlider = document.getElementById('player_heightslider')
var height = document.getElementById('player_width')
var heightSlider = document.getElementById('player_widthslider')

function slider2Height(value) {
  document.getElementById('player_height').value = value;
}

function slider2Width(value) {
  document.getElementById('player_width').value = value;
}

function height2Slider(value) {
  document.getElementById('player_heightslider').value = value;
}

function width2Slider(value) {
  document.getElementById('player_widthslider').value = value;
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