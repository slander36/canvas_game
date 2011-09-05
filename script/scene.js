fsg.scene = function() {
	
	this.init = function(canvas) {
		
		this.dx = canvas.width/32;
		this.dy = canvas.height/32;
		
		this.sceneCount = fsg.scenelist.length;
		
		this.drawmap = [];
		
		this.tilemap = [];
		for(i in fsg.tilelist) {
			var tile = new Image();
			tile.imgReady = false;
			tile.onload = function() {
				this.imgReady = true;
			};
			tile.src = fsg.tilelist[i];
			this.tilemap[i] = tile;
		}
		
		this.collisionmap = fsg.collisionlist;
		
		this.monsterlist = [];
		
		this.id = -1;
	};
	
	this.getNextScene = function() {
//		if(this.id < fsg.scenelist.length - 1) {
			this.id++;
			this.drawmap = fsg.scenelist[this.id % this.sceneCount];
			this.monsterlist = fsg.monsterlist[this.id % this.sceneCount];
//		}
	};
	
	this.reset = function() {
		this.id = -1;
	};
	
	this.getBlockType = function(x, y) {
		var index = x + y*this.dx;
		return this.collisionmap[this.drawmap[index]];
	};
	
};