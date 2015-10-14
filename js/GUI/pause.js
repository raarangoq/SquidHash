
function addPause(){
	var pause_menu = game.add.sprite(0, 0, 'pause');
	pause_menu.fixedToCamera = true;


	return pause_menu;
}

function pauseGame(){

	if(game.physics.arcade.isPaused){
		this.pause_menu.visible = false;
		game.physics.arcade.isPaused = false;
	}
	else{
		this.pause_menu.visible = true;
		game.physics.arcade.isPaused = true;
	}
}

