
function addPause(){
	var pause_menu = game.add.sprite(0, 0, 'blankpause');
	pause_menu.fixedToCamera = true;

	pause_menu.timeLastPause = game.time.now - 1500;

	pause_menu.actualPage = 0;
	pause_menu.lastChange = game.time.now;

	pause_menu.pages = [];
	pause_menu.pages[0] = addPausePage0();
	pause_menu.pages[1] = addPausePage1();
	pause_menu.pages[2] = addPausePage2();
	pause_menu.pages[3] = addPausePage3();

	for(var i=0; i<pause_menu.pages.length; i++)
		pause_menu.pages[i].setAlive(false);

	pause_menu.showPage = showPausePage;

	pause_menu.update = pauseMenuUpdate;
	pause_menu.setDrawOrder = pauseMenuSetDrawOrder;

	return pause_menu;
}


function pauseMenuUpdate(){
	if(!game.physics.arcade.isPaused)
		return;

	if(game.time.now - this.lastChange > 500){
		if(keyboard.leftKey())
			this.showPage(this.actualPage - 1);
		if(keyboard.rightKey())
			this.showPage(this.actualPage + 1);
	}
}

function showPausePage(page){
	if(page < 0)
		page = this.pages.length - 1;
	if(page > this.pages.length - 1)
		page = 0;

	this.lastChange = game.time.now;

	this.pages[this.actualPage].setAlive(false);
	this.actualPage = page;
	this.pages[this.actualPage].setAlive(true);
}

function pauseGame(){

	if(game.time.now - this.pause_menu.timeLastPause > 500){
		if(game.physics.arcade.isPaused){
			this.pause_menu.visible = false;
			game.physics.arcade.isPaused = false;
			this.pause_menu.pages[this.pause_menu.actualPage].setAlive(false);
		}
		else{
			this.pause_menu.visible = true;
			game.physics.arcade.isPaused = true;
			this.pause_menu.showPage(0);
		}
		this.pause_menu.timeLastPause = game.time.now;
	}
}

function pauseMenuSetDrawOrder(){
	this.bringToTop();
	for(var i=0; i<this.pages.length; i++)
		this.pages[i].bringToTop();
}

