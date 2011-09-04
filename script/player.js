fsg.player = function() {
	var player = new fsg.actor();
	
	player.initFollowUp = function() {
		// map coordinates
		this.cx = 1;
		this.cy = 1;
		// pixel values
		this.x = this.cx*32;
		this.y = this.cy*32;
		
		this.name = "Player 1";
	};
	
	player.reset = function() {
		this.cx = 1;
		this.cy = 1;
		this.x = this.cx*32;
		this.y = this.cy*32;
		this.moveQueue = [];
		this.moveTimer = 0;
	};
	
	player.move = function(modifier) {
		var speed = this.speed*modifier;
		switch(this.moveQueue[this.moveQueue.length-1]) {
			case 'up':
				if( (this.y - speed) < ((this.cy - 1) * 32) ) {
					this.y = (this.cy-1) * 32;
					this.cy--;
					this.moveQueue.pop();
				} else {
					this.y -= speed;
				}
				break;
			case 'down':
				if( (this.y + speed) > ((this.cy + 1) * 32) ) {
					this.y = (this.cy+1) * 32;
					this.cy++;
					this.moveQueue.pop();
				} else {
					this.y += speed;
				}
				break;
			case 'left':
				if( (this.x - speed) < ((this.cx - 1) * 32) ) {
					this.x = (this.cx-1) * 32;
					this.cx--;
					this.moveQueue.pop();
				} else {
					this.x -= speed;
				}
				break;
			case 'right':
				if( (this.x + speed) > ((this.cx + 1) * 32) ) {
					this.x = (this.cx+1) * 32;
					this.cx++;
					this.moveQueue.pop();
				} else {
					this.x += speed;
				}
				break;
			default:
				this.moveTimer = 0;
		};
	};
	
	return player;
};