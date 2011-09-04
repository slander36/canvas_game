fsg.scene = function() {
	
	this.init = function() {
		
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
		if(this.id < fsg.scenelist.length - 1) {
			this.id++;
			this.drawmap = fsg.scenelist[this.id];
			this.monsterlist = fsg.monsterlist[this.id];
		}
	};
	
	this.getBlockType = function(x, y) {
		var index = x + y*20;
		return this.collisionmap[this.drawmap[index]];
	};
	
};