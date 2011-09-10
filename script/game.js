fsg.game = function() {

	this.init = function(canvas, ctx) {
		
		var game = this;
		
		// Add render devices
		this.canvas = canvas;
		this.ctx = ctx;
		
		// Add initial scene
		
		this.scene = new fsg.scene();
		this.scene.init(this.canvas);
		
		// Add actors now
		
		this.player = new fsg.player();
		this.player.init(this.scene);
		this.player.loadImage('images/hero.png');
		
		this.playerScore = 0;
		
		this.monsters = [];
		
		this.isPaused = false;
		
		this.paused = new fsg.actor();
		this.paused.init(this.scene);
		this.paused.loadImage('images/paused.png');
		this.paused.x = (this.canvas.width/2)-48;
		this.paused.y = (this.canvas.height/2)-16;
		
		this.lifeLabel = new fsg.actor();
		this.lifeLabel.init(this.scene);
		this.lifeLabel.loadImage('images/lifelabel.png');
		this.lifeLabel.x = 0;
		this.lifeLabel.y = 0;
		
		this.levelLabel = new fsg.actor();
		this.levelLabel.init(this.scene);
		this.levelLabel.loadImage('images/levellabel.png');
		this.levelLabel.x = (this.canvas.width)-128;
		this.levelLabel.y = 0;
		
		/*
		this.skipSceneButton = new fsg.actor();
		this.skipSceneButton.init(this.scene);
		this.skipSceneButton.loadImage('images/skiplevelbutton.png');
		this.skipSceneButton.x = this.canvas.width-128;
		this.skipSceneButton.y = 0;
		*/
		
		this.pauseButton = new fsg.actor();
		this.pauseButton.init(this.scene);
		this.pauseButton.loadImage('images/pausebutton.png');
		this.pauseButton.x = this.canvas.width-128;
		this.pauseButton.y = this.canvas.height-32;
		this.pauseButton.addEventListner("mousedown", function() {
			game.isPaused = (game.isPaused == true ? false : true);
		});
		
		this.gamepad = {};
		
		this.gamepad.main = new fsg.actor();
		this.gamepad.main.init(this.scene);
		this.gamepad.main.loadImage('images/gamepad.png');
		this.gamepad.main.x = 0;
		this.gamepad.main.y = this.canvas.height-96;
		
		this.gamepad.up = new fsg.actor();
		this.gamepad.up.init(this.scene);
		this.gamepad.up.loadImage('images/gamepadup.png');
		this.gamepad.up.x = 0;
		this.gamepad.up.y = this.canvas.height-96;
		
		this.gamepad.down = new fsg.actor();
		this.gamepad.down.init(this.scene);
		this.gamepad.down.loadImage('images/gamepaddown.png');
		this.gamepad.down.x = 0;
		this.gamepad.down.y = this.canvas.height-96;
		
		this.gamepad.left = new fsg.actor();
		this.gamepad.left.init(this.scene);
		this.gamepad.left.loadImage('images/gamepadleft.png');
		this.gamepad.left.x = 0;
		this.gamepad.left.y = this.canvas.height-96;
		
		this.gamepad.right = new fsg.actor();
		this.gamepad.right.init(this.scene);
		this.gamepad.right.loadImage('images/gamepadright.png');
		this.gamepad.right.x = 0;
		this.gamepad.right.y = this.canvas.height-96;
		
		this.gamepad.current = this.gamepad.main;
		
	};
	
	this.update = function(paused, modifier, keysDown, gamepad, skipScene) {
		
		/*
		this.isPaused = paused;
		*/
		if(this.isPaused == true) return;
		
		if(skipScene) {
			this.nextScene();
			return;
		}
		
		if(this.scene.getBlockType(this.player.cx,this.player.cy) == 99) {
			this.nextScene();
			return;
		}
		
		var keyDown = keysDown[keysDown.length-1];
		
		this.gamepad.current = this.gamepad.main;
		
		if (38 == keyDown || gamepad == "up") {
			this.player.moveUp();
			this.gamepad.current = this.gamepad.up;
		}
		if (40 == keyDown || gamepad == "down") {
			this.player.moveDown();
			this.gamepad.current = this.gamepad.down;
		}
		if(37 == keyDown || gamepad == "left") {
			this.player.moveLeft();
			this.gamepad.current = this.gamepad.left;
		}
		if(39 == keyDown || gamepad == "right") {
			this.player.moveRight();
			this.gamepad.current = this.gamepad.right;
		}
		
		this.player.move(modifier);
		
		for(i in this.monsters) {
			if (
					   this.player.x 	 <= (this.monsters[i].x + 24)
					&& this.monsters[i].x <= (this.player.x + 24)
					&& this.player.y 	 <= (this.monsters[i].y + 24)
					&& this.monsters[i].y <= (this.player.y + 24)
				) {
				this.player.health -= 10;
				if(this.player.health <= 0) {
					this.gameOver();
				} else {
					this.reloadScene();
				}
				return;
			}
			this.monsters[i].move(modifier);
		}
	};
	
	this.reloadScene = function() {
		this.player.resetPosition();
		
		this.monsters = [];
		
		for(i in this.scene.monsterlist) {
			var args = this.scene.monsterlist[i];
			var monster = new fsg.monster();
			monster.init(this.scene);
			monster.setName(args.name);
			monster.loadImage(args.image);
			monster.setLocation(args.start[0],args.start[1]);
			this.monsters.push(monster);
		}
	};
	
	this.gameOver = function() {
		// Add Game Over label
		// and Restart? button
		
		if(true) {
			this.restartGame();
		}
	};
	
	this.restartGame = function() {
		this.scene.reset();
		this.scene.getNextScene();
		
		this.player.reset();
		
		this.monsters = [];
		
		for(i in this.scene.monsterlist) {
			var args = this.scene.monsterlist[i];
			var monster = new fsg.monster();
			monster.init(this.scene);
			monster.setName(args.name);
			monster.loadImage(args.image);
			monster.setLocation(args.start[0],args.start[1]);
			this.monsters.push(monster);
		}
	};

	this.nextScene = function() {
		
		this.scene.getNextScene();
		this.player.resetPosition();
		
		this.monsters = [];
		
		for(i in this.scene.monsterlist) {
			var args = this.scene.monsterlist[i];
			var monster = new fsg.monster();
			monster.init(this.scene);
			monster.setName(args.name);
			monster.loadImage(args.image);
			monster.setLocation(args.start[0],args.start[1]);
			this.monsters.push(monster);
		}
	};

	this.render = function() {
		
		for (i in this.scene.drawmap) {
			this.ctx.drawImage(this.scene.tilemap[this.scene.drawmap[i]],i%this.scene.dx*32,Math.floor(i/this.scene.dx)*32);
		}
		
		if (this.player.actorImage.actorReady) {
			this.ctx.drawImage(this.player.actorImage, this.player.x, this.player.y);
		}
		
		for (i in this.monsters) {
			this.ctx.drawImage(this.monsters[i].actorImage,this.monsters[i].x,this.monsters[i].y);
		}
		
		if (this.lifeLabel.actorImage.actorReady) {
			this.ctx.drawImage(this.lifeLabel.actorImage, this.lifeLabel.x, this.lifeLabel.y);
			this.ctx.fillStyle = "rgb(250,250,250)";
			this.ctx.font = "bold 20px Courier New";
			this.ctx.textAlign = "left";
			this.ctx.textBaseline = "top";
			this.ctx.fillText(this.player.health, 64+16, 6);
		}
		
		if (this.levelLabel.actorImage.actorReady) {
			this.ctx.drawImage(this.levelLabel.actorImage, this.levelLabel.x, this.levelLabel.y);
			this.ctx.fillStyle = "rgb(250,250,250)";
			this.ctx.font = "bold 20px Courier New";
			this.ctx.textAlign = "center";
			this.ctx.textBaseline = "top";
			this.ctx.fillText((this.scene.id+1),(this.canvas.width)-32,6);
		}
		
		/*
		if (this.skipSceneButton.actorImage.actorReady) {
			this.ctx.drawImage(this.skipSceneButton.actorImage, this.skipSceneButton.x, this.skipSceneButton.y);
		}
		*/
		
		if (this.pauseButton.actorImage.actorReady) {
			this.ctx.drawImage(this.pauseButton.actorImage, this.pauseButton.x, this.pauseButton.y);
		}
		
		if (this.gamepad.current.actorImage.actorReady) {
			this.ctx.drawImage(this.gamepad.current.actorImage, this.gamepad.current.x, this.gamepad.current.y);
		}
		
//		this.ctx.fillStyle = "rgb(250,250,250)";
//		this.ctx.font = "18px Helvetica";
//		this.ctx.textAlign = "left";
//		this.ctx.textBaseline = "top";
//		this.ctx.fillText("0: " + this.player.moveQueue[0], 640-128-96, 0);
		
		if(this.isPaused) {
			this.ctx.drawImage(this.paused.actorImage, this.paused.x, this.paused.y);
		}
	};
};