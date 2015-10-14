

var live;

function addPlayer(){
	player = game.add.sprite(400, 500, 'player');
    player.anchor.setTo(0.5, 0.5);
    game.physics.enable(player, Phaser.Physics.ARCADE);

    addBullets();
    player.ability = "";
    player.timeForUseItem = game.time.time;
    player.timeToLoseItem = 10000;
    player.health = 100;
    player.munition = 40;

    player.timeWithoutMunition = game.time.time;
    player.timeForNewMunition = 40000;

    player.timeWithVelocity = 5000;
    player.timeVelocityActivated = game.time.time - 5000;
    player.speed = 200;
    player.highSpeed = 500;

    player.hit_sound = game.add.audio('hit', 0.3);

    player.playerFiresBullet = playerFiresBullet;
    player.updatePlayer = updatePlayer;
    player.activateAbility = activateAbility;
    player.activateVelocity = activateVelocity;
    player.updateAbility = updateAbility;
    player.playerTakeDamage = playerTakeDamage;
    player.playerTakeDamageWeapon = playerTakeDamageWeapon;
    player.playerTakeDamageBoss = playerTakeDamageBoss;
    player.checkHealth = checkHealth;

}

function updatePlayer(){
    if (player.alive){

        player.body.velocity.setTo(0, 0);

        if (game.time.time - this.timeVelocityActivated < this.timeWithVelocity)
            this.speed = 500;
        else
            this.speed = 200;


        if ( keyboard.leftKey() && player.body.x>50)
            player.body.velocity.x = -this.speed;
        else if ( keyboard.rightKey() && player.body.x<730)
            player.body.velocity.x = this.speed;

        if ( keyboard.spaceKey() )
            this.playerFiresBullet();
        

        if ( !game.physics.arcade.isPaused && keyboard.gKey() )
            this.activateAbility();

        if ( this.munition <= 0 ) {
            texta.text = "Time for munition: " + 
                (  this.timeForNewMunition - (game.time.time - this.timeWithoutMunition)  ) / 1000;

            if (game.time.time - this.timeWithoutMunition > this.timeForNewMunition){
                this.munition = 1;
                item_munition = addItem(400, 0, "munition");
            }

        }
        else 
            texta.text = "";


        this.updateAbility();
    }
}

function playerFiresBullet() {
    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bullets.bulletTime && this.munition > 0)
    {
        
        bullets.fireBullet();
        this.munition--;

        if ( this.munition <= 0 ){
            this.timeWithoutMunition = game.time.time;
            this.timeForNewMunition = 10000 + (Math.random() * 20000);
        }
    }
}

function checkHealth(){
    if (this.health <= 0){
        this.hit_sound.play();
        lives--;
        this.health = 100;

        //  And create an explosion :)
        var explosion = explosions.getFirstExists(false);
        explosion.reset(player.body.x, player.body.y);
        explosion.play('kaboom', 30, false, true);
    }
}

function playerTakeDamage(){
    this.health -= enemyBullets.damage;

    this.checkHealth();
}

function playerTakeDamageWeapon(){
    this.health -= weaponBullets.damage;

    this.checkHealth();
}

function playerTakeDamageBoss(){
    this.health -= bossBullets.damage;

    this.checkHealth();
}

function updateAbility(){
    if ( game.time.time - this.timeForUseItem > this.timeToLoseItem ){
        gui.changeAbility(false);
        this.ability = "";
    }

    if ( torpedo != null && torpedo.body != null && torpedo.body.y < -20 ){
        torpedo.destroy();
        torpedo = null;
    }

}

function activateAbility(){
    if( this.ability == "machineGun" ){
        bullets.activateMachineGun();
        gui.changeAbility(false);
        this.ability = "";
    }
    else if( this.ability == "torpedo" ){
        torpedo = addTorpedo();
        gui.changeAbility(false);
        this.ability = "";
    }  
    else if (this.ability == "velocity"){
        this.activateVelocity();
        gui.changeAbility(false);
        this.ability = "";
    }      
}

function activateVelocity(){
    this.timeVelocityActivated = game.time.time;
}