// var socket = io.connect('/');
var ws = new WebSocket("ws://172.22.242.251:8888");
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


ws.addEventListener("open" , function(e){
	alert("open");
},false);

ws.addEventListener("message" , function(e){
	console.log(e.data);
	var parsedData = JSON.parse(e.data);

//	var parsedData = JSON.parse(e);
//	socket.on('devicemotion', function (e) {
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
	pX += parsedData.data.acg.x + 2;
	pY -= parsedData.data.acg.y + 2;
	poi.css({ left: pX + 'px', top: pY + 'px' });
//});	
}, false);


