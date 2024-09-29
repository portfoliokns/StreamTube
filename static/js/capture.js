window.onload = function() {
  var capture_button = document.getElementById('capture_button');
  var download_button = document.getElementById('download_button');
  var screenshot = document.getElementById('screenshot');

  capture_button.addEventListener('click', async function() {
    try{
      //スクリーンキャプチャを設定
      var stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });

      //
      var video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');

      video.addEventListener('loadedmetadata', () => {
        // canvasのサイズを動画のサイズに設定
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      
        // canvasにフレームを描画
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // ストリームを停止
        stream.getTracks().forEach(track => track.stop());
      
        // キャプチャした画像を表示
        screenshot.src = canvas.toDataURL('image/png');
      
        // 保存用リンクの作成
        download_button.href = canvas.toDataURL('image/png');
        download_button.download = 'screenshot.png'; // ダウンロードするファイル名
        download_button.style.display = 'block'; // リンクを表示
      });
    } catch (error) {
      console.error(error);
      alert('画面キャプチャに失敗しました。システムやブラウザの設定を確認してください。');
    }
  })

  console.log('Web Browser Is Ready');
  alert('このキャプチャ機能はブラウザ上の画面やPC上の画面を読み取る必要があるため、プライバシーとセキュリティに関する設定で読み取りの許可が必要になります。またキャプチャする場合は著作権等、法令に基づいた使用を心がけてください。キャプチャ機能を用いたことによるトラブル・被害・損害等について、このアプリの開発者は一切関与致しません。');
}