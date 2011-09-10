
// Main game loop

fsg.main = function() {
	
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = 320;
	canvas.height = 352;
	document.getElementById('game').appendChild(canvas);
	
	var keysDown = [];
	
	var paused = false;
	
	var gamepad = null;
	
	addEventListener("keydown", function(e) {
		if(keysDown.indexOf(e.keyCode) < 0)
			keysDown.push(e.keyCode);
	}, false);
	
	addEventListener("keyup", function(e) {
		if(keysDown.indexOf(e.keyCode) >= 0)
			keysDown.splice(keysDown.indexOf(e.keyCode),1);
	}, false);
	
	var skipScene = false;
	
	var ox = 48;
	var oy = canvas.height - 48;
	
	addEventListener("mousedown", function(e) {
		var x = e.pageX;
		var y = e.pageY;
		
		// Check if SkipLevel Pressed
		if((x > (canvas.width-128) && x < canvas.width)
				&& (y < 32 && y > 0)) {
			skipScene = true;
		}
		
		// Check if Pause Pressed
		/*
		if((x > (canvas.width-128) && x < canvas.width)
				&& (y > (canvas.height-32) && y < canvas.height)) {
			if(paused == true)
				paused = false;
			else
				paused = true;
		}
		*/
		
		// Create x & y relative to gamepad
		var rx = x - ox;
		var ry = y - oy;
		
		// Check if gamepad being clicked
		if ((0 < x && x < (ox + 48)) && ((oy - 48) < y && y < canvas.height)) {
			if(ry < 0 && Math.abs(ry) > Math.abs(rx))
				gamepad = "up";
			if(ry > 0 && Math.abs(ry) > Math.abs(rx))
				gamepad = "down";
			if(rx > 0 && Math.abs(rx) > Math.abs(ry))
				gamepad = "right";
			if(rx < 0 && Math.abs(rx) > Math.abs(ry))
				gamepad = "left";
		}
	});
	
	addEventListener("mousemove",function(e) {
		var x = e.pageX;
		var y = e.pageY;
		
		// Create x & y relative to gamepad
		var rx = x - ox;
		var ry = y - oy;
		
		// Check if gamepad being clicked
		if ( gamepad != null && (0 < x && x < (ox + 48)) && ((oy - 48) < y && y < canvas.height)) {
			if(ry < 0 && Math.abs(ry) > Math.abs(rx))
				gamepad = "up";
			if(ry > 0 && Math.abs(ry) > Math.abs(rx))
				gamepad = "down";
			if(rx > 0 && Math.abs(rx) > Math.abs(ry))
				gamepad = "right";
			if(rx < 0 && Math.abs(rx) > Math.abs(ry))
				gamepad = "left";
		}
	});
	
	addEventListener("mouseup", function(e) {
		gamepad = null;
	});
	
	canvas.addEventListener("touchstart", function(e) {
		
		e.preventDefault();
		
		for(var i = 0 ; i < e.touches.length ; i++ ) {
			
			var touch = e.touches[i];
			
			var x = touch.pageX;
			var y = touch.pageY;
			
			// Check if SkipLevel Pressed
			if((x > (canvas.width-128) && x < canvas.width)
					&& (y < 32 && y > 0)) {
				skipScene = true;
			}
			
			// Check if Pause Pressed
			if((x > (canvas.width-128) && x < canvas.width)
					&& (y > (canvas.height-32) && y < canvas.height)) {
				if(paused == true)
					paused = false;
				else
					paused = true;
			}
			
			// Create x & y relative to gamepad
			var rx = x - ox;
			var ry = y - oy;
			
			// Check if gamepad being touched
			if ((0 < x && x < (ox + 48)) && ((oy - 48) < y && y < canvas.height)) {
				if(ry < 0 && Math.abs(ry) > Math.abs(rx))
					gamepad = "up";
				if(ry > 0 && Math.abs(ry) > Math.abs(rx))
					gamepad = "down";
				if(rx > 0 && Math.abs(rx) > Math.abs(ry))
					gamepad = "right";
				if(rx < 0 && Math.abs(rx) > Math.abs(ry))
					gamepad = "left";
			}
		}
	});
	
	canvas.addEventListener("touchmove", function(e) {
		
		e.preventDefault();
		
		for(var i = 0 ; i < e.touches.length ; i++) {
		
			var touch = e.touches[i];
			
			var x = touch.pageX;
			var y = touch.pageY;
			
			// Create x & y relative to gamepad
			var rx = x - ox;
			var ry = y - oy;
			
			// Check if gamepad being touched
			if ((0 < x && x < (ox + 48)) && ((oy - 48) < y && y < canvas.height)) {
				if(ry < 0 && Math.abs(ry) > Math.abs(rx))
					gamepad = "up";
				if(ry > 0 && Math.abs(ry) > Math.abs(rx))
					gamepad = "down";
				if(rx > 0 && Math.abs(rx) > Math.abs(ry))
					gamepad = "right";
				if(rx < 0 && Math.abs(rx) > Math.abs(ry))
					gamepad = "left";
			}
		}
	});
	
	canvas.addEventListener("touchend", function(e) {
		gamepad = null;
	});
	
	var game = new fsg.game();
	
	game.init(canvas, ctx);
	var then = Date.now();
	game.nextScene();
	
	setInterval(function() {
		var now = Date.now();
		var delta = now - then;
		game.update(paused, delta/1000, keysDown, gamepad, skipScene);
		skipScene = false;
		game.render();
		
		// FPS
		ctx.fillStyle = "rgb(20,180,180)";
		ctx.font = "bold 18px Helvetica";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText("FPS:"+(1000/delta).toFixed(2), 96, canvas.height - 32);
		then = now;
	}, 1);
	
};