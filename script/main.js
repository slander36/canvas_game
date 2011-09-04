
// Main game loop

fsg.main = function() {
	
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = 640;
	canvas.height = 480;
	document.getElementById('game').appendChild(canvas);
	
	var keysDown = {};
	
	addEventListener("keydown", function(e) {
		keysDown[e.keyCode] = true;
	}, false);
	
	addEventListener("keyup", function(e) {
		delete keysDown[e.keyCode];
	}, false);
	
	var mousePos = [];
	var mouse = false;
	
	addEventListener("mousedown", function(e) {
		mouse = true;
	});
	
	addEventListener("mouseup", function(e) {
		mouse = false;
	});
	
	addEventListener("mousemove", function(e) {
		if(mouse && 0 < e.pageX && e.pageX < canvas.width && 0 < e.pageY && e.pageY < canvas.height) {
			mousePos[0] = e.pageX;
			mousePos[1] = e.pageY;
			mouse = true;
		} else {
			mouse = false;
		}
	});
	
	var game = new fsg.game();
	
	game.init(canvas, ctx);
	var then = Date.now();
	game.reloadScene();
	
	setInterval(function() {
		var now = Date.now();
		var delta = now - then;
		game.update(delta/1000, keysDown, mouse, mousePos);
		game.render();
		then = now;
	}, 1);
	
};