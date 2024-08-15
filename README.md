## __Opera-Ⅱ__


### ・操作方法

こちらのサイトでは、公共交通オープンデータセンター(https://www.odpt.org)の次のオープンデータを利用しております。

* 全日空 リアルタイム出発情報 / Flight departure information of All Nippon Airways (https://ckan.odpt.org/dataset/a_flight_departure_info-ana)
* 全日空 リアルタイム到着情報 / Flight arrival information of All Nippon Airways (https://ckan.odpt.org/dataset/a_flight_arrival_info-ana)

そのため、ご利用には上記データセンターでの開発者サイトに利用者登録を行い、アクセストークンを入手していることが必要となります。

###### 操作方法
①index.jsファイル内の8行目「ApiToken」に、公共交通オープンデータセンター内で取得した、アクセストークンを入力。
②Webブラウザでlocalhost上で開く。
③<現在はこの機能のみ> 「便名検索」を押し、リンク先にジャンプする。

###機能
・便名検索(/flightnumber)
こちらでは、フォーム内に指定したANA便の便名を入力すると、当該便のリアルタイム情報を検索することが可能となります。

<入力方法>
こちらでは、ANA便を2レターコード(NH)形式で入力が必要です。
国内線、国際線のANA運行便、ANAと共同運行便が検索可能です。

そのため、国内線においては、
AIRDO便(NH4700・NH4800番台)
Solaseed Air便(NH2400・NH2500番台)
スターフライヤー便(NH3800番台)
IBEXエアラインズ便(NH3100番台)
オリエンタルエアブリッジ便(NH4600番台)　の便においても検索可能です。

また、便名が NH99(HND-KIX) NH397(HND-SYO)など、2桁または3桁の便については、
入力する際に、「NH99」「NH099」「NH0099」など、一部の便においては入力フォーマットが異なる場合があります。
そのため、お手数をおかけしますが、いくつかのパターンでご入力をお願いします。


また、出発前・出発済(上空)・到着済と、現在のステータスによって表示が変わります。
いくつかのパターンでお試しください。

#####動作確認用 便名
NH239 HND-FUK 6:20
NH059 NHD-CTS 10:00
NH4725 HND-CTS 13:50(ADO運航)
NH2461 HND-KMI 15:30(SNA運航)
NH755 HND-KMQ 17:05
NH097 HND-KIX 20:35