
// Variables para controlar la entrada por teclado
var keyboard;

var text;

loading = {
	preload: function(){

text = game.add.text(20, 540, 'Cargando...', { fontSize: '28px', fill: '#ffffff'});
text.fixedToCamera = true;

    game.load.image('arrow', 'assets/pics/bullets/arrow.png');
    game.load.image('arrowItem', 'assets/pics/items/arrowItem.png');
    game.load.spritesheet('bombArrow', 'assets/pics/bullets/bombArrow.png', 13, 32);
    game.load.image('fastArrow', 'assets/pics/bullets/fastArrow.png');

    game.load.image('torpedo', 'assets/pics/items/bombArrowItem.png');
    game.load.image('velocity', 'assets/pics/items/speedItem.png');

    game.load.image('enemyBullet', 'assets/pics/bullets/spiderBullet.png');
    game.load.image('bossWeaponBullet', 'assets/pics/bullets/bossWeaponBullet.png');
    game.load.image('bossBullet', 'assets/pics/bullets/bossBullet.png');

    game.load.spritesheet('heart', 'assets/pics/GUI/heart.png', 14, 16);
    game.load.image('healthBar', 'assets/pics/GUI/healthbar.png');


    game.load.spritesheet('drone', 'assets/pics/enemys/drone.png', 32, 32);
    game.load.spritesheet('leader', 'assets/pics/enemys/leader.png', 32, 32);
    game.load.spritesheet('mother', 'assets/pics/enemys/mother.png', 32, 32);
    game.load.spritesheet('worm', 'assets/pics/enemys/worm.png', 32, 32);
    game.load.spritesheet('spiderDie', 'assets/pics/enemys/spiderDie.png', 128, 128);

    game.load.image('enemyBar', 'assets/pics/enemys/enemyBar.png');

    game.load.image('ink', 'assets/pics/ink.png');

    game.load.spritesheet('leftWeapon', 'assets/pics/enemys/leftWeapon.png', 98, 111);
    game.load.spritesheet('rightWeapon', 'assets/pics/enemys/rightWeapon.png', 98, 111);
    game.load.spritesheet('boss', 'assets/pics/enemys/boss.png', 332, 191);

    game.load.spritesheet('kaboom', 'assets/pics/explode.png', 128, 128);

    game.load.spritesheet('player', 'assets/pics/player.png', 70, 70);
    game.load.spritesheet('attack','assets/pics/attackzone.png', 30, 30);
    
    game.load.image('starfield', 'assets/pics/starfield.png');

    

    game.load.image('end', 'assets/pics/images/end.png');
    game.load.image('initmenu', 'assets/pics/images/initmenu.png');
    game.load.image('lose', 'assets/pics/images/lose.png');
    game.load.image('pause', 'assets/pics/images/pause.png');
    game.load.image('win', 'assets/pics/images/win.png');
    game.load.spritesheet('linkfail', 'assets/pics/videos/linkfail.png', 145, 175);



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
		//game.state.start('end');
	}
}
