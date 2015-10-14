
function addItem(x, y, type){

    var item;
    
    item = game.add.sprite(x, y, type);
    
        

    game.physics.enable(item, Phaser.Physics.ARCADE);
    item.body.colliderWorldBounds = true;

    item.type = type;

    game.physics.arcade.moveToXY(item, x, y+20, 120);

    item.sound = game.add.audio('item');

    item.takeItem = takeItem;

    return item;
}


function takeItem(){
    

    this.sound.play();

    if (this.type == "munition"){
        player.munition += 40;
        this.type = "";
    }
    else{
        gui.changeAbility(true);
        player.ability = this.type;
        player.timeForUseItem = game.time.time;
    }
	
	this.destroy();
}