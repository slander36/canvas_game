fsg.actor = function() {
	
	this.init = function(scene) {
		this.name = "Actor";
		this.health = 100;
		this.speed = 256;
		this.x = 0;
		this.y = 0;
		this.w = 32;
		this.h = 32;
		this.scene = scene;
		
		this.actorImage = new Image();
		this.actorImage.actorReady = false;
		this.actorImage.onload = function() {
			this.actorReady = true;
		};
		
		if(this.initFollowUp) this.initFollowUp();
	};
	
	this.loadImage = function(image) {
		this.actorImage.src = image;
	};
	
};