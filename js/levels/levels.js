


var player;
var squid;
var segment = null;


var gui;


var bullets;
var keyboard;
var explosions;
var score = 0;
var scoreString = '';
var scoreText;
var lives;
var enemyBullets;

var items = null;
var torpedo = null;

var pauseImage;
var winImage;
var loseImage;
var endImage;

var inkImage;
var timeOfInkColide;

var winState = false;
var boss;


var sound_backgroud;


var text;
var texta;
var textb;

var bmd, sprite;
var graphics;


var timeSpam;

levels = {
    create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //  The scrolling starfield background
    //starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');
    game.stage.backgroundColor = '#aaaaaa';

    addPlayer();

text = game.add.text(20, 540, 'Cargando...', { fontSize: '16px', fill: '#ffffff'});
texta = game.add.text(20, 400, 'Cargando...', { fontSize: '16px', fill: '#ffffff'});
textb = game.add.text(20, 200, 'Cargando...', { fontSize: '16px', fill: '#ffffff'});


//game.global.level = 7;

    this.addAliens();
    
    //  An explosion pool
    explosions = game.add.group();
    explosions.createMultiple(10, 'kaboom');
    explosions.forEach(this.setupExplosion, this);

    spiderExplodes = game.add.group();
    spiderExplodes.createMultiple(30, 'spiderDie');
    spiderExplodes.forEach(this.setupExplosion, this);


    items = addItem(400, 200, "torpedo");


    inkImage = game.add.sprite(0, 0, 'ink');
    inkImage.visible = false;
    inkImage.alpha = 1;
    timeOfInkColide = game.time.now - 5000;

    winImage = game.add.sprite(0, 0, 'win');
    winImage.visible = false;
    loseImage = game.add.sprite(0, 0, 'lose');
    loseImage.visible = false;
    endImage = game.add.sprite(0, 0, 'end');
    endImage.visible = false;

    sound_backgroud = game.add.audio('levelB', 0.5, true);
//    sound_backgroud.play();




  

gui = new GUI();

game.time.advancedTiming = true;

timeSpam = game.time.now;
segment = null;

    },



    update: function() {

        squid.update();

        if(!winState && 
            squid.keys.length > 0 && 
            game.time.now - timeSpam > (10000 / game.global.level) ){
                if (segment == null){
                    segment = addSegment();
                    timeSpam = game.time.now;
                }
        }

        if (player.alive)
        {
            player.update();
            if ( !winState ){
                game.physics.arcade.overlap(enemyBullets, player, this.enemyHitsPlayer, null, this);
                if (segment != null)
                    segment.update();
            }

            if(torpedo && torpedo.body){
                if(torpedo.body.y < -30){
                    torpedo.destroy();
                }
                if (game.physics.arcade.overlap(torpedo, squid) ){
                    squid.takeDamage(torpedo.damage);
                    this.addExplosion(torpedo.body.x, torpedo.body.y);
                    torpedo.destroy();
                    
                }
            }

            if (items){
                if (items.body.y > 600){
                    items.destroy();
                    items = null;
                }
                game.physics.arcade.overlap(items, player, this.setAbility);

            }

        }
        else{
            if( keyboard.enterKey() )
                this.restart();
        }

        if( winState ){
            if (game.global.level != 5)
                winImage.visible = true;
            else
                endImage.visible = true;
            if( keyboard.enterKey() )
                this.restart();
        }


        gui.updateGui();

        if (game.time.now - timeOfInkColide < 2000){

        }
        else if(game.time.now - timeOfInkColide < 4000 )
            game.add.tween(inkImage).to({ alpha:0 }, 2000, Phaser.Easing.Linear.None, true);
        else
            inkImage.visible = false;

    },

    addAliens: function(){
        squid = addSquid(200, 30);
        for (var i=0; i < game.global.level * 10; i++)
            squid.extendTentacle(null);


    },

    addExplosion: function(x, y){
        var explosion = explosions.getFirstExists(false);
        explosion.reset(x, y);
        explosion.play('kaboom', 30, false, true);
    },

    // Establecer la explosión
    setupExplosion: function(explosion) {
        explosion.anchor.x = 0.5;
        explosion.anchor.y = 0.5;
        explosion.animations.add('kaboom', null, 10);
    },

    setAbility: function(item, player){
        gui.upScore(100);
        item.takeItem();
    },

    enemyHitsPlayer: function(player, bullet) {
        
        bullet.kill();
        player.takeDamage(enemyBullets.damage);

        timeOfInkColide = game.time.now;
        inkImage.alpha = 1;
        inkImage.visible = true;
        
    },

    

    render: function() {

textb.text = game.time.fps;
//if (squid.retractingTentacle[0] != null)
texta.text = player.speed;
    },

    resetBullet: function(bullet) {

        //  Called if the bullet goes out of the screen
        bullet.kill();

    },

    restart: function() {
        sound_backgroud.stop();

        if (player.alive){
            game.global.level++;
            if (game.global.level == 6){
                game.global.level = 1;
                game.global.lives = 3;
            }
        }
        else{
            game.global.lives = 3;
            score = 0;
            game.global.health = 100;
        }

        winState = false;

        game.state.start('levels');

    },



}
