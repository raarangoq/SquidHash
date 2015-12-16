

function itemsBar(){
	this.itemsBar = game.add.sprite(20, 495, 'healthBar');


	this.itemImage = [];
	this.itemImage['torpedo'] = game.add.sprite(80, 500, 'torpedo');
	this.itemImage['torpedo'].visible = false;
	this.itemImage['velocity'] = game.add.sprite(80, 500, 'velocity');
	this.itemImage['velocity'].visible = false;

//	this.timeItem = game.add.text(80, 515, "", { font: '16px Arial', fill: '#fff' })


	this.updateItemsBar = updateItemsBar;
	this.setItemsBarAbility = setItemsBarAbility;
	this.useItemsBarAbility = useItemsBarAbility;
	this.setDrawOrder = itemsBarSetDrawOrder;
}


function updateItemsBar(){
	
}

function itemsBarSetDrawOrder(){
	this.itemsBar.bringToTop();
	this.itemImage['torpedo'].bringToTop();
	this.itemImage['velocity'].bringToTop();
}


function useItemsBarAbility(type){
	this.itemImage[type].visible = false;
}

function setItemsBarAbility(type){
	this.itemImage[type].visible = true;

}