fsg.game = function() {

	this.init = function(canvas, ctx) {
		// Add render devices
		this.canvas = canvas;
		this.ctx = ctx;
		
		// Add initial scene
		
		this.scene = new fsg.scene();
		this.scene.init();
		this.scene.getNextScene();
		
		// Add actors now
		
		this.player = new fsg.player();
		this.player.init(this.scene);
		this.player.loadImage('images/hero.png');
		this.playerScore = 0;
		
		this.monster = new fsg.monster();
		this.monster.init(this.scene);
		this.monster.loadImage('images/monster.png');
		
	};
	
	this.update = function(modifier, keysDown, mouse, mousePos) {
		
		if (38 in keysDown)
			this.player.moveUp();
		if (40 in keysDown)
			this.player.moveDown();
		if(37 in keysDown)
			this.player.moveLeft();
		if(39 in keysDown)
			this.player.moveRight();
		
		this.player.move(modifier);
		
		/* Replacing with above code
		var speed = this.player.speed * modifier;
		if (38 in keysDown || ( mouse && (mousePos[1] < (this.player.y + 16)))) { // Player holding up
			//this.player.y = ((this.player.y - speed - 32) > 0 ? (this.player.y - speed) : 32);
		}
		if (40 in keysDown || ( mouse && (mousePos[1] > (this.player.y + 16)))) { // Player holding down
			//this.player.y = ((this.player.y + speed + 64) < this.canvas.height ? (this.player.y + speed) : this.canvas.height - 64);
		}
		if (37 in keysDown || ( mouse && (mousePos[0] < (this.player.x + 16)))) { // Player holding left
			//this.player.x = ((this.player.x - speed - 32) > 0 ? (this.player.x - speed) : 32);
		}
		if (39 in keysDown || ( mouse && (mousePos[0] > (this.player.x + 16)))) { // Player holding right
			//this.player.x = ((this.player.x + speed + 64) < this.canvas.width ? (this.player.x + speed) : this.canvas.width - 64);
		}
		*/
		
		/* Removing for now

		// Are they touching?
		if (
			   this.player.x*32 <= (this.monster.x + 32)
			&& this.monster.x*32 <= (this.player.x + 32)
			&& this.player.y*32 <= (this.monster.y + 32)
			&& this.monster.y*32 <= (this.player.y + 32)
		) {
			++this.playerScore;
			this.reloadScene();
		}
		
		*/
	};

	this.reloadScene = function() {
		// Check scene
		if (this.playerScore > 1 && this.playerScore % 3 == 0) {
			this.scene.getNextScene();
		}
		
		// Throw the monster somewhere on the screen randomly
		this.monster.x = 32 + (Math.random() * (this.canvas.width - 32*3));
		this.monster.y = 32 + (Math.random() * (this.canvas.height - 32*3));
	};

	this.render = function() {
		if (this.scene.bgImage.bgReady) {
			this.ctx.drawImage(this.scene.bgImage, 0, 0, this.canvas.width, this.canvas.height);
		};
		
		if (this.player.actorImage.actorReady) {
			this.ctx.drawImage(this.player.actorImage, this.player.x, this.player.y);
		};
		
		if (this.monster.actorImage.actorReady) {
			this.ctx.drawImage(this.monster.actorImage, this.monster.x, this.monster.y);
		};
		
		if(this.scene.overlayImage.overlayReady) {
			this.ctx.drawImage(this.scene.overlayImage, 0, 0);
		};
		
		/*
		this.ctx.fillStyle = "rgb(200,200,200)";
		this.ctx.font = "24px Helvetica";
		this.ctx.textAlign = "left";
		this.ctx.textBaseline = "top";
		this.ctx.fillText("Goblins Caught: " + this.playerScore, 32, 32);
		*/
		
		this.ctx.fillStyle = "rgb(200,200,200)";
		this.ctx.font = "18px Helvetica";
		this.ctx.textAlign = "left";
		this.ctx.textBaseline = "top";
		this.ctx.fillText("0: " + this.player.moveQueue[0], 640-128, 32);
//		this.ctx.fillText("1: "+this.player.moveQueue[1], 640-128, 64);
	};
};