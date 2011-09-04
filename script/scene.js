fsg.scene = function() {
	
	this.backgroundList = ["images/intro.png",
	                       "images/fall.png",
	                       "images/winter.png",
	                       "images/spring.png"];
	
	this.overlayList = [null,
	                    null,
	                    "images/winter_overlay.png",
	                    null];
	
	this.collisionmap = [];
	
	this.init = function() {
		this.bgImage = new Image();
		this.bgImage.bgReady = false;
		this.bgImage.onload = function() {
			this.bgReady = true;
		};
		
		this.overlayImage = new Image();
		this.overlayImage.overlayReady = false;
		this.overlayImage.onload = function() {
			this.overlayReady = true;
		};
		
		this.id = -1;
	};
	
	this.loadBackground = function(bg) {
		this.bgImage.src = bg;
	};
	
	this.loadOverlay = function(overlay) {
		this.overlayImage.src = overlay;
	};
	
	this.getNextScene = function() {
		if(this.id < this.backgroundList.length - 1) {
			this.id++;
			this.loadBackground(this.backgroundList[this.id]);
			this.collisionmap = fsg.scenelist[this.id];
		}
	};
	
	this.getBlockType = function(x, y) {
		var index = x + y*20;
		return this.collisionmap[index];
	};
	
};