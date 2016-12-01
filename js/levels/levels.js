


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
var endText;

var background;

var inkImage;
var timeOfInkColide;

var winState = false;
var timeOfWinState;
var boss;


var sound_backgroud;
var boom_sound;


var text;
var texta;
var textb;

var bmd, sprite;
var graphics;


var timeSpam;

var winAnimationPointA = false;
var playedA = false;
var playedB = false;
var playedC = false;
var playedD = false;
var playedE = false;


levels = {
    create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);


    background = game.add.tileSprite(0, 0, 800, 600, 'background');
    //game.stage.backgroundColor = '#aaaaaa';

    addPlayer();

    inkImage = game.add.sprite(0, 0, 'ink');
    inkImage.visible = false;
    inkImage.alpha = 1;
    timeOfInkColide = game.time.now - 5000;

    winImage = game.add.sprite(0, 0, 'win');
    winImage.visible = false;
    loseImage = game.add.sprite(0, 0, 'lose');
    loseImage.visible = false;
    endImage = game.add.sprite(0, 0, 'sky');
    endImage.visible = false;


    gui = new GUI();

//text = game.add.text(20, 540, 'Cargando...', { fontSize: '16px', fill: '#ffffff'});
texta = game.add.text(20, 400, 'Cargando...', { fontSize: '16px', fill: '#ffffff'});
//textb = game.add.text(20, 200, 'Cargando...', { fontSize: '16px', fill: '#ffffff'});


//game.global.level = 7;

    this.addAliens();

    //  An explosion pool
    explosions = game.add.group();
    explosions.createMultiple(15, 'kaboom');
    explosions.forEach(this.setupExplosion, this);


//    items = addItem(400, 200, "torpedo");

    timeSpam = game.time.now;
    segment = null;

    sound_backgroud = game.add.audio('levelB', 0.5, true);
    sound_backgroud.play();
    boom_sound = game.add.audio('boom', 0.5);

    if (game.global.level == 5){
        link = game.add.sprite(0, 0, 'linkfail');
        game.physics.enable(link, Phaser.Physics.ARCADE);
        link.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
        link.visible = false;
        scream_sound = game.add.audio('scream');



        endText = game.add.text(400, 300, '',
            { font: "26pt ferney", fill: '#fff', stroke:  '#000000', strokeThickness: 6,
            wordWrap: true, wordWrapWidth: 600, align: "center"});
        endText.anchor.set(0.5);
        endImage.addChild(endText);

    }





//game.time.advancedTiming = true;


        winState = false;
        playedA = false;
        playedB = false;
        playedC = false;
        playedD = false;
        playedE = false;
        winAnimationPointA = false;

    },



    update: function() {

        squid.update();

        if (player.alive)
        {
            player.update();
            if ( !winState ){
                game.physics.arcade.overlap(enemyBullets, player, this.enemyHitsPlayer, null, this);

                if (segment != null)
                    segment.update();

                if(squid.keys.length > 0 &&
                    game.time.now - timeSpam > (10000 / game.global.level) ){
                    if (segment == null){
                        segment = addSegment();
                        timeSpam = game.time.now;
                    }
                }
            }
            else{
                this.playWinAnimation();

                if( keyboard.enterKey() )
                    this.restart();
            }

            if(torpedo && torpedo.body){
                if(torpedo.body.y < -30)
                    torpedo.destroy();

                if (game.physics.arcade.overlap(torpedo, squid.beak) ){
                    squid.takeDamage(torpedo.damage);
                    this.addExplosion(torpedo.body.x, torpedo.body.y);
                    torpedo.destroy();
                }

                if (game.physics.arcade.overlap(torpedo, squid) ){
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

        gui.updateGui();

        if (game.time.now - timeOfInkColide < 2000){
            // nada
        }
        else if(game.time.now - timeOfInkColide < 4000 )
            game.add.tween(inkImage).to({ alpha:0 }, 2000, Phaser.Easing.Linear.None, true);
        else
            inkImage.visible = false;

    },

    addAliens: function(){
        squid = addSquid(320, 0);
        for (var i=0; i < game.global.level * 10; i++)
            squid.extendTentacle(null);


    },

    addExplosion: function(x, y){
        var explosion = explosions.getFirstExists(false);
        explosion.reset(x, y);
        explosion.play('kaboom', 30, false, true);
        boom_sound.play();
    },

    playWinAnimation: function(){
        inkImage.visible = false;
        if (game.global.level < 5){
            if(game.time.now - timeOfWinState < 2000){ //wait
            }
            else if(game.time.now - timeOfWinState < 5000){
                if(!winAnimationPointA){
                    squid.play('die');
                    game.physics.arcade.moveToXY(player, 800, 300, 200);
                    player.playAnimations("right");
                    player.body.collideWorldBounds = false;
                    winAnimationPointA = true;
                }
            }
            else{
                winImage.visible = true;
            }
        }
        else{
//            sound_backgroud.stop();

            var local_time = game.time.now - timeOfWinState;
            if( local_time < 2800){//wait
            }
            else if (local_time < 4000){
                if(!playedA){
                    squid.play('die');
                //    this.addExplosion(squid.body.x + 50, squid.body.y);
                //    this.addExplosion(squid.body.x + 50, squid.body.y + 100);
                    playedA = true;
                    boom_sound.play();
                }
            }
            else if (local_time < 4200){
                if(!playedB){
                    this.addExplosion(squid.body.x + 50, squid.body.y + 200);
                    this.addExplosion(squid.body.x + 50, squid.body.y + 300);
                    playedB = true;
                    boom_sound.play();
                }
            }
            else if (local_time < 4400){
                if(!playedC){
                    this.addExplosion(squid.body.x + 50, squid.body.y + 400);
                    this.addExplosion(squid.body.x + 50, squid.body.y + 450);
                    playedC = true;
                    boom_sound.play();
                }
            }
            else if (local_time < 4600){
                if(!playedD){
                    playedD = true;

                    this.addExplosion(squid.body.x - 50, squid.body.y + 450);
                    this.addExplosion(squid.body.x + 150, squid.body.y + 450);
                    player.visible = false;
                    link.visible = true;

                    link.animations.play('fly');
                    link.body.x = player.body.x;
                    link.body.y = player.body.y;
                    game.add.tween(link.scale).to({ x:2, y:2 }, 3000, Phaser.Easing.Linear.None, true);
                    game.add.tween(link.body.position).to({x:300, y:200}, 3000, null, true);

                    scream_sound.play();
                    boom_sound.play();
                }
            }
            else if (local_time < 9000){
                if (link.scale.x == 2){
                    link.body.position.setTo(300, 200);
                    link.frame = 9;
                    scream_sound.stop();

                    if (!playedE){
                        player.sound_hit.play();
                        playedE = true;
                    }
                }
            }
            else{
                endImage.visible = true;
                endText.text = 'Bien hecho, has logrado acabar con esos enormes calamares, ahora el pueblo está a salvo.';
                link.visible = false;
            }
        }
    },

    // Establecer la explosión
    setupExplosion: function(explosion) {
        explosion.anchor.x = 0.5;
        explosion.anchor.y = 0.5;
        explosion.animations.add('kaboom', null, 10);
    },

    setAbility: function(item, player){
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

//textb.text = game.time.fps;
//if (squid.retractingTentacle[0] != null)
texta.text = squid.tentacles[0].yTarget;

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

                ScormProcessSetValue("cmi.core.score.min", 0.0000);
                ScormProcessSetValue("cmi.core.score.max", 100.0000);
                ScormProcessSetValue("cmi.core.score.raw", 100);
                if( ScormProcessGetValue("cmi.comments") < gui.scoreText.score )
                    ScormProcessSetValue("cmi.comments", gui.scoreText.score);


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
