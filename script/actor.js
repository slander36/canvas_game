fsg.actor = function() {
	
	this.init = function(scene) {
		
		// basics
		this.name = "Actor";
		this.health = 100;
		this.speed = 160;
		this.cx = 0;
		this.cy = 0;
		this.x = 0;
		this.y = 0;
		this.w = 32;
		this.h = 32;
		this.scene = scene;
		
		// image loading
		this.actorImage = new Image();
		this.actorImage.actorReady = false;
		this.actorImage.onload = function() {
			this.actorReady = true;
			this.actor.w = this.width;
			this.actor.h = this.height;
		};
		
		// movement queue
		this.moveQueue = [];
		this.moveTimer = 0;
		
		// if actor subclass has more run that as well
		if(this.initFollowUp) this.initFollowUp();
	};
	
	this.loadImage = function(image) {
		this.actorImage.src = image;
		this.actorImage.actor = this;
	};
	
	this.moveUp = function() {
		if(this.moveQueue.length == 0 &&
				(  this.scene.getBlockType(this.cx,this.cy-1) == 1
				|| this.scene.getBlockType(this.cx,this.cy-1) == 99))
			this.moveQueue.push('up');
	};
	
	this.moveDown = function() {
		if(this.moveQueue.length == 0 &&
				(  this.scene.getBlockType(this.cx,this.cy+1) == 1
				|| this.scene.getBlockType(this.cx,this.cy+1) == 99 ))
			this.moveQueue.push('down');
	};
	
	this.moveLeft = function() {
		if(this.moveQueue.length == 0 &&
				(  this.scene.getBlockType(this.cx-1,this.cy) == 1
				|| this.scene.getBlockType(this.cx-1,this.cy) == 99))
			this.moveQueue.push('left');
	};
	
	this.moveRight = function() {
		if(this.moveQueue.length == 0 &&
				(  this.scene.getBlockType(this.cx+1,this.cy) == 1
				|| this.scene.getBlockType(this.cx+1,this.cy) == 99))
			this.moveQueue.push('right');
	};
	
	this.addEventListner = function(event, callback) {
		var actor = this;
		this.scene.canvas.addEventListener(event, function(e) {
			var x = actor.x;
			var y = actor.y;
			var w = actor.w;
			var h = actor.h;
			if(e.offsetX > x && e.offsetX < (x + w) &&
					e.offsetY > y && e.offsetY < (y + h)) {
				callback();
			}
		});
	};
	
};