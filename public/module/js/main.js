var ws = new WebSocket("ws://172.22.242.251:8888"); // サーバーのIPを指定します
var poi = $('.poi');
var pX = 0;
var pY = 0;
var vp = $.viewport();
var cX = (vp.window.width / 2) - parseInt(poi.css('width')) / 2;
var cY = (vp.window.height / 2) - parseInt(poi.css('height')) / 2;

// initialize
poi.css({ left: cX + 'px', top: cY + 'px' });
pX = cX;
pY = cY;

// socket通信開始したらopenアラートを出します
ws.addEventListener("open" , function(e){
	alert("open");
},false);

// メッセージをサーバーから受け取った時の処理
ws.addEventListener("message" , function(e){
	// debug用
	// console.log(e.data);
	// if (e.acg.x > 0) {
	// 	pX++;
	// } else {
	// 	pX--;
	// }
	// if (e.acg.y < 0) {
	// 	pY++;
	// } else {
	// 	pY--;
	// }

	// ポイを移動させます
	var parsedData = JSON.parse(e.data);
	pX += parsedData.data.acg.x + 2;
	pY -= parsedData.data.acg.y + 2;
	poi.css({ left: pX + 'px', top: pY + 'px' });
}, false);


