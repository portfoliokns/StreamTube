window.onload = function() {
  var capture_button = document.getElementById('capture_button');
  var stop_button = document.getElementById('stop_button');
  var download_button = document.getElementById('download_button');
  var captures_capture_time = document.getElementById('captures_capture_time');
  var captures_download_time = document.getElementById('captures_download_time');
  var captures_counter = document.getElementById('captures_counter');
  var screenshot = document.getElementById('screenshot');
  var stream
  var captureInterval
  var screenshots = []

  capture_button.addEventListener('click', async function() {
    try{
      //スクリーンキャプチャを設定
      stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });

      screenshots = []

      //ビデオタグ設定
      var video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      //canvas設定
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');

      video.addEventListener('loadedmetadata', () => {
        // canvasのサイズを動画のサイズに設定
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        var count = 0
        var time = 1000 * captures_capture_time.value
        // 1秒ごとに実行
        captureInterval = setInterval(() => {
          // canvasにフレームを描画
          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          // キャプチャした画像を表示
          screenshot.src = canvas.toDataURL('image/png');

          //キャプチャした画像を保存ように配列に入れる
          screenshots.push(canvas.toDataURL('image/png'));

          //キャプチャした画像の数を表示する
          captures_counter.innerText = screenshots.length

          count += 1;
        }, time);
      
      });
    } catch (error) {
      console.error(error);
      alert('画面キャプチャに失敗しました。システムやブラウザの設定を確認してください。');
    }
  })

  stop_button.addEventListener('click', function() {
    stream.getTracks().forEach(track => track.stop());
    clearInterval(captureInterval);
  })

  download_button.addEventListener('click', function() {
    var time = 1000 * captures_download_time.value
    screenshots.forEach((dataURL, index) => {
      setTimeout(() => {
        const downloadLink = document.createElement('a');
        downloadLink.href = dataURL;
        downloadLink.download = 'screenshot' + index + '.png'
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }, index * time)
    })
  })

  console.log('Web Browser Is Ready');
  alert('このキャプチャ機能はブラウザ上の画面やPC上の画面を読み取る必要があるため、プライバシーとセキュリティに関する設定で読み取りの許可が必要になります。またキャプチャする場合は著作権等、法令に基づいた使用を心がけてください。キャプチャ機能を用いたことによるトラブル・被害・損害等について、このアプリの開発者は一切関与致しません。');
}