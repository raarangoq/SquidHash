
function GUI(){

	// Objetos y Atributos
	
	

	// Vidas
	this.lives_bar = addLivesBar();
	this.items_bar = new itemsBar();
	addScore();

	// Pause
	this.pause_menu = addPause();

	// Metodos
	this.updateGui = updateGui;
	this.setDrawOrder = guiSetDrawOrder;

	this.pauseGame = pauseGame;
	this.upScore = upScore;
	this.changeAbility = changeAbility;

	this.pauseGame();


	this.pauseKey = keyboard.addKey(Phaser.Keyboard.ENTER);
    this.pauseKey.onDown.add(this.pauseGame, this);
}

function updateGui(){
	this.items_bar.updateItemsBar();
	this.lives_bar.updateLivesBar();
}


// true for take a new item, false when de player uses a item or lose the item
function changeAbility(take, type){
	if (take)
		this.items_bar.setItemsBarAbility(type);
	else
		this.items_bar.useItemsBarAbility(type);
}

function guiSetDrawOrder(){
	this.pause_menu.setDrawOrder();
	this.items_bar.setDrawOrder();
	this.lives_bar.setDrawOrder();
	scoreText.setDrawOrder();
}
