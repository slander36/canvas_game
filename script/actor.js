fsg.actor = function() {
	
	this.init = function() {
		this.name = "Actor";
		this.health = 100;
		this.speed = 256;
		this.x = 0;
		this.y = 0;
		
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