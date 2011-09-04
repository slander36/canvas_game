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
		
		// movement queue & timer for smooth movements
		this.moveQueue = [];
		this.moveTimer = 0;
	};
	
	player.moveUp = function() {
		if(this.scene.getBlockType(this.cx,this.cy-1) == 1 && this.moveQueue.length == 0)
			this.moveQueue.push('up');
//		else if(this.scene.getBlockType(this.cx,this.cy-2) == 1 && this.moveQueue.length == 1)
//			this.moveQueue.push('up');
	};
	
	player.moveDown = function() {
		if(this.scene.getBlockType(this.cx,this.cy+1) == 1 && this.moveQueue.length == 0)
			this.moveQueue.push('down');
//		else if(this.scene.getBlockType(this.cx,this.cy+2) == 1 && this.moveQueue.length == 1)
//			this.moveQueue.push('down');
	};
	
	player.moveLeft = function() {
		if(this.scene.getBlockType(this.cx-1,this.cy) == 1 && this.moveQueue.length == 0)
			this.moveQueue.push('left');
//		else if(this.scene.getBlockType(this.cx-2,this.cy) == 1 && this.moveQueue.length == 1)
//			this.moveQueue.push('left');
	};
	
	player.moveRight = function() {
		if(this.scene.getBlockType(this.cx+1,this.cy) == 1 && this.moveQueue.length == 0)
			this.moveQueue.push('right');
//		else if(this.scene.getBlockType(this.cx+2,this.cy) == 1 && this.moveQueue.length  == 1)
//			this.moveQueue.push('right');
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