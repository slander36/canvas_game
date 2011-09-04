fsg.scene = function() {
	
	/*
	this.backgroundList = ["images/intro.png",
	                       "images/fall.png",
	                       "images/winter.png",
	                       "images/spring.png"];
	
	this.overlayList = [null,
	                    null,
	                    "images/winter_overlay.png",
	                    null];
	*/
	
	this.init = function() {
		/*
		this.bgImage = new Image();
		this.bgImage.bgReady = false;
		this.bgImage.onload = function() {
			this.bgReady = true;
		};
		*/
		
		this.collisionmap = [];
		
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
		
		this.id = -1;
	};
	/*
	this.loadBackground = function(bg) {
		this.bgImage.src = bg;
	};
	*/
	
	this.getNextScene = function() {
		if(this.id < fsg.scenelist.length - 1) {
			this.id++;
			//this.loadBackground(this.backgroundList[this.id]);
			this.collisionmap = fsg.scenelist[this.id];
		}
	};
	
	this.getBlockType = function(x, y) {
		var index = x + y*20;
		return this.collisionmap[index];
	};
	
};