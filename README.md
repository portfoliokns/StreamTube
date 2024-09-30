# このアプリケーションについて
このアプリケーションはブラウザ上で、youtubeの動画を視聴する際に視聴者の手助けとなる機能を搭載したアプリケーションです。機能は以下の通りです。
- マルチ視聴機能
- クリップ視聴機能
- フィルタリング機能
- キャプチャ機能
- エクスポート/インポート機能

※状況に応じて、機能をアップデートしていく予定です。

# 各種機能について
## トップページについて
特段、操作できることはありません。「おしらせ一覧」「アップデート情報」には実装した機能やサービスに関してのお知らせを掲載しています。「不具合情報」については発見した不具合について掲載しています。

## マルチ視聴機能
視聴したい動画のURLを複数設定することで、最大4つの動画を同時に視聴することができます。例えば、空港や観光地などのライブ配信を流すことでリフレッシュすることができるかもしれません。あるいは、自然災害発生時等で複数のチャンネルから情報収集したい場合にも使えます。もしくは、ゲーム実況者と対戦あるいは協力する場合に、ゲーム実況者の位置情報などの情報を入手するために活用できます。

## クリップ視聴機能
視聴したい動画のURLを設定し、開始と終了の時刻(hh:mm:ss:ms)を設定することで、特定の部分を視聴することができます。YouTubeのクリップ機能はありますが、これは5秒から60秒までの時間しか、クリップできません。5秒以下あるいは60秒以上の時間でも特定の部分を繰り返し視聴したい場合に、クリップ視聴の機能を使用できます。

## フィルタリング機能
クリップ視聴機能に実装している機能になります。各種パラメータを操作することで、動画の明るさを変更できたり、ぼかしを入れたりするなどの操作ができます。暗くてみずらい映像を明るくして見ることや、恐怖映像をもっと緊迫感を持ってみることを想定しています。またみずらい箇所を解析するために使用することもできます。またこの機能にはエクスポート/インポート機能が利用できます。

## キャプチャ機能
PC上あるいはブラウザ上の映像を画像(.png形式)に変換できる機能になります。キャプチャした画像はダウンロードすることができ、変換した画像は画像編集や動画編集で利用することを想定しています。なおYouTube上の映像を変換することを想定していますが、それ以外にもキャプチャすることができます。なお、この機能を使用する際は、著作権等の法律を遵守した上での使用が求められます。

## エクスポート/インポート機能
視聴した際の詳細なパラメータをjsonファイルで保存することができます。そのファイルを他の方と共有することも可能であり、また個人でYouTubeを楽しむための管理ファイルとして使用することができます。

# 事前準備
- PCとブラウザ（Google Chrome）をご用意ください。
- 視聴したい動画のURLを準備してください。
- 次のURLへアクセスしてください。
https://portfoliokns.github.io/StreamTube/

# 使い方
## 基本操作について
- ページ上部にある「マルチ視聴」「クリップ視聴」「キャプチャ機能」をクリックして、専用のページに移ってください。
- 視聴したい動画をテキストに貼り付けて、「再生」ボタンを押すと、動画の視聴が始まります。
- 画面の大きさを調整したい場合は、拡大縮小の値を変更して、調整を行なってください。
- 初期設定に戻したい場合は、「リセット」ボタンを押してください。
- 音量についてはyoutubeプレーヤー上で、手動で設定していただく必要があります。
- 不具合が発生した場合、ブラウザの再読み込みを行ってください。

## マルチ視聴機能
- YouTubeの動画のURLを複数分貼り付け、「再生」ボタンを押すと、その動画が再生されます。
- 視聴できる動画は最大で4つまでです。
- 画面の大きさはデフォルトで366×650となっています。この値を変更すると、大きさを変えることができます。

## クリップ視聴機能
- 視聴できる動画は最大で1つのみとなっています。
- YouTubeの動画のURLを貼り付け、「再生」ボタンを押すと、その動画が再生されます。
- 視聴したい時間（開始時間と終了時間）を入力することで、その時間のみが繰り返し再生されます。ただし入力する際は半角文字で hh:mm:ss:ms のように入力する必要があります。デフォルトでは、開始時間は0秒、終了時間は1分となっています。
- 画面の大きさはデフォルトで671×1192となっています。この値を変更すると、大きさを変えることができます。
- フィルタリングの各種パラメータを操作することで、映像にフィルタリングを掛けることができます。

## キャプチャ機能
- 「撮影」ボタンを押すと、どの画面をキャプチャするか選択する画面が表示されます。
- 画面を選択したら、「共有」を押すと、そのタイミングの映像が画像としてキャプチャできます。
- クリッププレーヤー上にキャプチャした画像が表示されます。
- また「ダウンロード」ボタンを押すと、キャプチャした画像を.png形式でダウンロードすることができます。

## エクスポート/インポート機能
- 「エクスポート」ボタンを押すと、クリップした動画の詳細（URLや時間）やフィルタリングの状態をjsonファイルで保存することができます。
- エクスポートしたjsonファイルを選択後、「インポート」ボタンを押すことで、その動画を視聴することができます。

## その他
- URLの中に、videoIDが記載されていないと動画が視聴できません。そのためショート動画やクリップした動画は視聴できません。ただしショート動画については、高評価を行った後、高評価のプレイリストからvideoIDが記載されたURLを取得するで、視聴が可能であることを確認しています。
- チャンネル管理者がyoutubeサイト以外での視聴を禁止としている場合、このアプリケーション上で閲覧することはできません。その場合は個別に動画を視聴してください。
- 存在しない動画、非公開となった動画、あるいはすでに運営により削除された動画を設定しても、視聴はできません

# 免責事項
- このアプリケーションはGitHubの公開機能を用いて公開されています。このアプリケーションを使用したことにより発生した被害や損害について、このアプリの開発者は一切関与致しません。
