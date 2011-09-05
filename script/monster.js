fsg.monster = function() {
	
	var monster = new fsg.actor();
	
	monster.initFollowUp = function() {
		this.speed = 64;
	};
	
	monster.setName = function(name) {
		this.name = name;
	};
	
	monster.setLocation = function(x,y) {
		this.cx = x;
		this.cy = y;
		this.x = this.cx*32;
		this.y = this.cy*32;
	};
	
	monster.move = function(modifier) {
		if(this.moveQueue.length == 0) {
			var random = Math.floor(Math.random()*100) % Math.floor(3 / modifier);
			if(random == 0) {
				var direction = Math.floor((Math.random()*100)) % 4;
					switch(direction) {
						case 0:
							this.moveUp();
							break;
						case 1:
							this.moveRight();
							break;
						case 2:
							this.moveDown();
							break;
						case 3:
							this.moveLeft();
							break;
					};
			}
		} else {
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
		}
	};
	
	return monster;
};