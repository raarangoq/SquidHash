


var player;
var squid;
var segment = null;


var gui;


var bullets;
var keyboard;
var explosions;
var spiderExplodes;
var starfield;
var score = 0;
var scoreString = '';
var scoreText;
var lives;
var enemyBullets;
var weaponBullets;
var bossBullets;

var items;
var item_munition;
var torpedo;

var pauseImage;
var winImage;
var loseImage;
var endImage;

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


    //items = addItem(400, 000, "torpedo");


    winImage = game.add.sprite(0, 0, 'win');
    winImage.visible = false;
    loseImage = game.add.sprite(0, 0, 'lose');
    loseImage.visible = false;
    endImage = game.add.sprite(0, 0, 'end');
    endImage.visible = false;

    //if(game.global.level < 5)
      //  sound_backgroud = game.add.audio('levelA', 0.5, true);
    //else
      //  sound_backgroud = game.add.audio('levelB', 0.5, true);
    //sound_backgroud.play();





  

gui = new GUI();

game.time.advancedTiming = true;

timeSpam = game.time.now;

    },



    update: function() {

        squid.update();

        if(squid.keys.length > 0 && game.time.now - timeSpam > 2000){
            if (segment == null)
                segment = addSegment();
        }

        if (player.alive)
        {
            player.update();
            if ( !winState ){
                //game.physics.arcade.overlap(enemyBullets, player, this.enemyHitsPlayer, null, this);
                if (segment != null)
                    segment.update();
            }

            //game.physics.arcade.overlap(items, player, this.setAbility);
            //game.physics.arcade.overlap(item_munition, player, this.setAbility);

        }
        else{
            if( keyboard.enterKey() )
                this.restart();
        }

        if( winState ){
            if (game.global.level != 7)
                winImage.visible = true;
            else
                endImage.visible = true;
            if( keyboard.enterKey() )
                this.restart();
        }


//        gui.updateGui();


    },

    addAliens: function(){
        squid = addSquid(200, 30);
        for (var i=0; i<30; i++)
            squid.extendTentacle(null);


    },

    // Establecer la explosión
    setupExplosion: function(explosion) {
        explosion.anchor.x = 0.5;
        explosion.anchor.y = 0.5;
        explosion.animations.add('kaboom', null, 10);
    },

    setAbility: function(item, player){
        gui.upScore(3000);
        item.takeItem();
    },

    enemyHitsPlayer: function(player, bullet) {
        
        bullet.kill();
        player.playerTakeDamage();

        this.playerDies();

    },

    weaponHitsPlayer: function(player, bullet){
        bullet.kill();
        player.playerTakeDamageWeapon();

        this.playerDies();
    },

    playerDies: function(){
        // When the player dies
        if (lives < 1)
        {
            player.kill();
            enemyBullets.callAll('kill');

            loseImage.visible = true;
        }
    },

    render: function() {

textb.text = game.time.fps;
//if (squid.retractingTentacle[0] != null)
texta.text = squid.retractingTentacle[0];
    },

    resetBullet: function(bullet) {

        //  Called if the bullet goes out of the screen
        bullet.kill();

    },

    restart: function() {
        sound_backgroud.stop();

        if (player.alive)
            game.global.level++;
        else
            game.global.level = 1;

        winState = false;

        if (game.global.level == 8)
            game.global.level = 1;

        game.state.start('levels');

    },



}
