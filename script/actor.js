fsg.actor = function() {
	
	this.init = function(scene) {
		
		// basics
		this.name = "Actor";
		this.health = 100;
		this.speed = 256;
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
		};
		
		// movement queue
		this.moveQueue = [];
		this.moveTimer = 0;
		
		// if actor subclass has more run that as well
		if(this.initFollowUp) this.initFollowUp();
	};
	
	this.loadImage = function(image) {
		this.actorImage.src = image;
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
	
};