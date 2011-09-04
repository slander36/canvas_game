fsg.player = function() {
	var player = new fsg.actor();
	
	player.initFollowUp = function() {
		this.x = 64;
		this.y = 64;
		this.name = "Player 1";
	};
	
	return player;
};