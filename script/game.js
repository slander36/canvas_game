fsg.game = function() {

	this.init = function(canvas, ctx) {
		
		// Add render devices
		this.canvas = canvas;
		this.ctx = ctx;
		
		// Add initial scene
		
		this.scene = new fsg.scene();
		this.scene.init();
		
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
		this.paused.x = 320-48;
		this.paused.y = 240-16;
		
	};
	
	this.update = function(paused, modifier, keysDown, skipScene) {
		
		this.isPaused = paused;
		
		if(this.isPaused == true) return;
		
		if(skipScene) {
			this.nextScene();
			return;
		}
		
		if(this.scene.getBlockType(this.player.cx,this.player.cy) == 99) {
			this.nextScene();
			return;
		}
		
		if (38 in keysDown)
			this.player.moveUp();
		if (40 in keysDown)
			this.player.moveDown();
		if(37 in keysDown)
			this.player.moveLeft();
		if(39 in keysDown)
			this.player.moveRight();
		
		this.player.move(modifier);
		
		for(i in this.monsters) {
			if (
					   this.player.x 	 <= (this.monsters[i].x + 32)
					&& this.monsters[i].x <= (this.player.x + 32)
					&& this.player.y 	 <= (this.monsters[i].y + 32)
					&& this.monsters[i].y <= (this.player.y + 32)
				) {
				this.reloadScene();
				return;
			}
			this.monsters[i].move(modifier);
		}
	};
	
	this.reloadScene = function() {
		this.player.reset();
		this.player.health -= 10;
		
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

	this.render = function() {
		
		for(i in this.scene.drawmap) {
			this.ctx.drawImage(this.scene.tilemap[this.scene.drawmap[i]],i%20*32,Math.floor(i/20)*32);
		}
		
		if (this.player.actorImage.actorReady) {
			this.ctx.drawImage(this.player.actorImage, this.player.x, this.player.y);
		};
		
		for(i in this.monsters) {
			this.ctx.drawImage(this.monsters[i].actorImage,this.monsters[i].x,this.monsters[i].y);
		}
		
		this.ctx.fillStyle = "rgb(250,250,250)";
		this.ctx.font = "24px Helvetica";
		this.ctx.textAlign = "left";
		this.ctx.textBaseline = "top";
		this.ctx.fillText("Level: " + (this.scene.id+1),0,480-32);
		
		this.ctx.fillStyle = "rgb(200,200,200)";
		this.ctx.font = "18px Helvetica";
		this.ctx.textAlign = "left";
		this.ctx.textBaseline = "top";
		this.ctx.fillText("0: " + this.player.moveQueue[0], 640-128, 32);
		
		this.ctx.fillStyle = "rgb(200,200,200)";
		this.ctx.font = "18px Helvetica";
		this.ctx.textAlign = "left";
		this.ctx.textBaseline = "top";
		this.ctx.fillText("Life: " + this.player.health, 32, 64);

		this.ctx.fillStyle = "rgb(200,200,200)";
		this.ctx.font = "18px Helvetica";
		this.ctx.textAlign = "left";
		this.ctx.textBaseline = "top";
		this.ctx.fillText("Skip Scene", 640-96, 0);

		this.ctx.fillStyle = "rgb(200,200,200)";
		this.ctx.font = "18px Helvetica";
		this.ctx.textAlign = "left";
		this.ctx.textBaseline = "top";
		this.ctx.fillText("Pause", 640-64, 480-32);
		
		if(this.isPaused) {
			this.ctx.drawImage(this.paused.actorImage, this.paused.x, this.paused.y);
		}
	};
};