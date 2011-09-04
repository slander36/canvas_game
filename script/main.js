
// Main game loop

fsg.main = function() {
	
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = 640;
	canvas.height = 480;
	document.getElementById('game').appendChild(canvas);
	
	var keysDown = {};
	
	var paused = false;
	
	addEventListener("keydown", function(e) {
		keysDown[e.keyCode] = true;
	}, false);
	
	addEventListener("keyup", function(e) {
		delete keysDown[e.keyCode];
	}, false);
	
	var skipScene = false;
	
	addEventListener("mousedown", function(e) {
		if((e.pageX > (640-96) && e.pageX < 640)
				&& (e.pageY < 64 && e.pageY > 0)) {
			skipScene = true;
		}
		if((e.pageX > (640-64) && e.pageX < 640 )
				&& (e.pageY > (480-32) && e.pageY < 480)) {
			if(paused == true)
				paused = false;
			else
				paused = true;
		}
	});
	
	var game = new fsg.game();
	
	game.init(canvas, ctx);
	var then = Date.now();
	game.nextScene();
	
	setInterval(function() {
		var now = Date.now();
		var delta = now - then;
		game.update(paused, delta/1000, keysDown, skipScene);
		skipScene = false;
		game.render();
		
		// FPS
		ctx.fillStyle = "rgb(200,200,200)";
		ctx.font = "18px Helvetica";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText("FPS: "+(1000/delta).toFixed(2), 32, 32);
		
		then = now;
	}, 1);
	
};