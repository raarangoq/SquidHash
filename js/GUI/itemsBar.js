

function itemsBar(){
	this.itemsBar = game.add.sprite(20, 495, 'healthBar');
	
	this.munitionImage = game.add.sprite(30, 500, "arrowItem");
	this.munition = game.add.text(50, 515, player.munition, { font: '16px Arial', fill: '#fff' });

	this.itemImage = [];
	this.itemImage['torpedo'] = game.add.sprite(80, 500, 'torpedo');
	this.itemImage['torpedo'].visible = false;
	this.itemImage['machineGun'] = game.add.sprite(80, 500, 'machineGun');
	this.itemImage['machineGun'].visible = false;
	this.itemImage['velocity'] = game.add.sprite(80, 500, 'velocity');
	this.itemImage['velocity'].visible = false;

	this.timeItem = game.add.text(80, 515, "", { font: '16px Arial', fill: '#fff' })


	this.updateItemsBar = updateItemsBar;
	this.setItemsBarAbility = setItemsBarAbility;
	this.useItemsBarAbility = useItemsBarAbility;
}


function updateItemsBar(){
	this.munition.text = player.munition;

	if( player.ability != "" )
		this.timeItem.text = (player.timeToLoseItem - (game.time.time - player.timeForUseItem)) / 1000;
	else 
		this.timeItem.text = ""; 
}

function useItemsBarAbility(){
	if (player.ability != '')
		this.itemImage[player.ability].visible = false;
}

function setItemsBarAbility(){

	if (player.ability != '')
		this.itemImage[player.ability].visible = false;

	if (items.type != 'munition')
		this.itemImage[items.type].visible = true;
}