
// Variables para controlar la entrada por teclado
var keyboard;

var text;

loading = {
	preload: function(){

    game.time.events.add(2000, function () {       
        text = game.add.text(20, 540, "Cargando..", 
            { font: "28pt ferney", fill: '#fff', stroke: '#000000', strokeThickness: 3 });
    },this);

    game.load.spritesheet('bombArrow', 'assets/pics/bullets/bombArrow.png', 13, 32);
    game.load.image('enemyBullet', 'assets/pics/bullets/bossBullet.png');

    game.load.image('torpedo', 'assets/pics/items/bombArrowItem.png');
    game.load.image('velocity', 'assets/pics/items/speedItem.png');

    game.load.spritesheet('heart', 'assets/pics/GUI/heart.png', 14, 16);
    game.load.image('healthBar', 'assets/pics/GUI/healthbar.png');

    game.load.spritesheet('boss', 'assets/pics/enemys/boss.png', 256, 204);
    game.load.spritesheet('beak', 'assets/pics/enemys/beak.png', 48, 48);
    game.load.spritesheet('segment', 'assets/pics/enemys/segment.png', 31, 40);
    game.load.spritesheet('food', 'assets/pics/enemys/food.png', 69, 49);
    game.load.image('enemyBar', 'assets/pics/enemys/enemyBar.png');

    game.load.image('ink', 'assets/pics/ink.png');


    

    game.load.spritesheet('kaboom', 'assets/pics/explode.png', 128, 128);
    game.load.spritesheet('player', 'assets/pics/player.png', 70, 70);
    game.load.spritesheet('attack','assets/pics/attackzone.png', 30, 30);
    game.load.image('background', 'assets/pics/background.png');

    
    game.load.image('end', 'assets/pics/images/end.png');
    game.load.image('initmenu', 'assets/pics/images/initmenu.png');
    game.load.image('lose', 'assets/pics/images/lose.png');
    game.load.image('pause', 'assets/pics/images/pause.png');
    game.load.image('win', 'assets/pics/images/win.png');

    game.load.image('sky', 'assets/pics/videos/introvideo.png');
    game.load.spritesheet('link', 'assets/pics/videos/link.png', 148, 150);
    game.load.spritesheet('linkfail', 'assets/pics/videos/linkfail.png', 145, 175);
    game.load.image('cloud', 'assets/pics/videos/cloud.png');
    game.load.image('dialog', 'assets/pics/videos/dialog.png');


/**************************************
    Sounds
    *********************************/

	game.load.audio('inicio', 'assets/sounds/inicio.mp3');
    game.load.audio('levelB', 'assets/sounds/levelB.mp3');
    game.load.audio('final', 'assets/sounds/final.mp3');

    game.load.audio('item', 'assets/sounds/item.mp3');
    game.load.audio('rugido', 'assets/sounds/rugido.mp3');
    game.load.audio('new_spider', 'assets/sounds/nace_araña.mp3');
    game.load.audio('arrow', 'assets/sounds/flecha.mp3');
    game.load.audio('torpedo', 'assets/sounds/torpedo.mp3');
    game.load.audio('creature', 'assets/sounds/creature.mp3');
    game.load.audio('hit', 'assets/sounds/golpes.mp3');
    game.load.audio('swordair', 'assets/sounds/espada-aire.mp3');
    game.load.audio('scream', 'assets/sounds/grito.mp3');
    game.load.audio('boom', 'assets/sounds/explosion.mp3');

	},

	
	create: function(){
		addKeyboard();

		game.state.start('initMenu');	
    }
}
