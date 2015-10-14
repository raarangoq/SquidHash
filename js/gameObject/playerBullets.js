


function addBullets(){
	//  Our bullet group
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'arrow');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);

    bullets.bulletTime = 0;
    bullets.timeBetweenFires = 500;
    bullets.bulletsForMachineGun = 0;

    bullets.damage = 50;
    bullets.speed = 400;

    bullets.arrow_sound = game.add.audio("arrow", 0.2);
    bullets.torpedo_sound = game.add.audio("torpedo", 0.5);


    bullets.fireBullet = fireBullet;
    bullets.activateMachineGun = activateMachineGun;
}


function fireBullet(){
	//  Grab the first bullet we can from the pool
    bullet = this.getFirstExists(false);
    if (bullet)
    {
        this.arrow_sound.play();

        //  And fire it
        bullet.reset(player.x, player.y + 8);
        bullet.body.velocity.y = -this.speed;
        this.bulletTime = game.time.now + this.timeBetweenFires;

        this.bulletsForMachineGun--;
    }

    if( this.bulletsForMachineGun <= 0 )
        this.timeBetweenFires = 500;
}

function activateMachineGun(){
    this.bulletsForMachineGun = 20;
    this.timeBetweenFires = 180;
}

function addTorpedo(){
bullets.torpedo_sound.play();

    torpedo = game.add.sprite( player.body.x + 15, player.body.y - 20 , 'bombArrow');
    torpedo.anchor.setTo(0.5, 0.5);
    torpedo.animations.add('fly', [0, 1], 6, true);
    game.physics.enable(torpedo, Phaser.Physics.ARCADE);
    torpedo.body.colliderWorldBounds = true;
    torpedo.play('fly');
    torpedo.body.acceleration.y = -300;

    torpedo.damage = 150;



    return torpedo;
}