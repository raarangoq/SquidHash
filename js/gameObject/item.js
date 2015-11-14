
function addItem(x, y, type){
    var item;
    item = game.add.sprite(x, y, type);
    
    game.physics.enable(item, Phaser.Physics.ARCADE);
    item.body.colliderWorldBounds = true;

    item.type = type;

    item.body.gravity.y = 40;
    item.body.velocity.y = -60;
    item.body.velocity.x = 30;
    //game.physics.arcade.moveToXY(item, x, y+20, 120);

    item.sound = game.add.audio('item');

    item.takeItem = takeItem;

    return item;
}


function takeItem(){
    

    this.sound.play();

    gui.changeAbility(true, this.type);
    player.activateAbility(this.type);
    
	items = null;
	this.destroy();
}