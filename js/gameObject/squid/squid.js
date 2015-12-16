
function addSquid(x, y){

    var squid;
    squid = game.add.sprite(x, y, "boss");
    addBossAnimations(squid);
    game.physics.enable(squid, Phaser.Physics.ARCADE);
    squid.body.setSize(158, 126, 46, 40);

    squid.beak = squid.addChild(game.add.sprite(105, 150, 'beak'));
    game.physics.enable(squid.beak, Phaser.Physics.ARCADE);
    addBeakAnimations(squid.beak);
    squid.beak.takeDamage = beakTakeDamage;

    squid.tentacles = [];
    squid.tentaclesIsAttacking = [];
    squid.retractingTentacle = [];
    squid.xTentaclesPosition;
    squid.keys = [];
    squid.timeOfInitAttack = [];

    squid.lowerTimeBetweenAttacks = 5000 - (game.global.level * 500);
    squid.highTimeBetweenAttacks = 8000 - (game.global.level * 500);
    squid.timeForNextAttack = game.time.now + squid.highTimeBetweenAttacks;
    squid.xDirectionForAttack = 0;
    squid.yDirectionForAttack = 0;

    squid.timeBetweenInks = 5000 + (5000 / game.global.level);
    squid.timeOfLastInk = game.time.now;
    addInkBullets();

    for(var i=0; i < 10 * game.global.level * 2; i++){
        squid.keys[i] = i;
    }
    for(var i=0; i < game.global.level * 2; i++){
        squid.timeOfInitAttack[i] = game.time.now;
        squid.tentaclesIsAttacking[i] = false;
        squid.retractingTentacle[i] = false;
    }

    
    squid.maxHealth = 300 + (game.global.level * 50);
    squid.health = squid.maxHealth;

    squid.healthBar = game.add.sprite(0,  20, 'enemyBar');
    squid.healthBar.width = 190;
    squid.addChild(squid.healthBar);

    squid.hit_sound = game.add.audio('creature');

    squid.update = updateSquid;
    squid.extendTentacle = extendTentacle;
    squid.attack = squidAttacks;
    squid.isAttacking = squidIsAttacking;
    squid.retractTentacle = retractTentacle;
    squid.takeDamage = squidTakeDagame;
    squid.setDrawOrder = setSquidDrawOrder;
    squid.setTimeForNextAttack = setSquidTimeForNextAttack;

    addTentacles(squid);
    return squid;
}

function beakTakeDamage(damage){
    this.parent.takeDamage(damage);
}

function addBossAnimations(squid){
    squid.animations.add('move', [ 0 ], 20, true);
    squid.animations.add('die', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 10);

    squid.play('move');
}

function addBeakAnimations(beak){
    beak.animations.add('move', [0, 1, 2, 3], 5, true);
    beak.play('move');
}

function addTentacles(squid){
    if (game.global.level == 5){
        squid.xTentaclesPosition = squid.body.x - 95;
    }
    else if(game.global.level == 4){
        squid.xTentaclesPosition = squid.body.x - 60;
    }
    else if(game.global.level == 3){
        squid.xTentaclesPosition = squid.body.x - 20;
    }
    else if(game.global.level == 2){
        squid.xTentaclesPosition = squid.body.x + 25;
    }
    else
        squid.xTentaclesPosition = squid.body.x + 60;

    for (var i = game.global.level * 2 - 1; i>=0; i--){

        if ( i < game.global.level )
            squid.tentacles[i] = addTentacle( 
                squid.xTentaclesPosition + (i*40), 
                squid.body.y + 150, 
                i);
        else
            squid.tentacles[i] = addTentacle( 
                squid.xTentaclesPosition + (i*40) + 60, 
                squid.body.y + 150, 
                i);

        squid.tentaclesIsAttacking[i] = false;
        squid.keys.splice(i, 1);
    }
}

function updateSquid(){
    

    for(var i=0; i< game.global.level * 2; i++){
        if(this.tentacles[i] != null)
            this.tentacles[i].update();
    }

    if (!winState && game.global.health > 0){
        player.attack.attackHitEnemy(this.beak);

        for (var i = 0; i < game.global.level * 2; i++){
            this.isAttacking(i);
        }

        if ( game.time.now > this.timeForNextAttack ){
            var j = Math.floor(Math.random() * game.global.level * 2);
            this.attack(j);
        }

        if (game.time.now - this.timeOfLastInk > this.timeBetweenInks){
            enemyBullets.fireInkBullet(this);
            this.timeOfLastInk = game.time.now;
        }

    }

//    game.physics.arcade.collide(player, this, );
    
}

function setSquidTimeForNextAttack(i){
    this.timeForNextAttack = game.time.now + this.lowerTimeBetweenAttacks + 
        ( Math.random() * ( this.highTimeBetweenAttacks - this.lowerTimeBetweenAttacks ));
}

function squidIsAttacking(i){
    if (this.tentaclesIsAttacking[i] && this.tentacles[i]){
        if (game.time.now - this.timeOfInitAttack[i] < 500){
            this.xDirectionForAttack = player.body.x - this.tentacles[i].body.x;
            this.yDirectionForAttack = player.body.y - this.tentacles[i].body.y;

        }
        else if (game.time.now - this.timeOfInitAttack[i] < 1000){
            //wait
        }
        else if (game.time.now - this.timeOfInitAttack[i] < 1500){
            this.tentaclesIsAttacking[i] = false;
            this.retractingTentacle[i] = false;

            var segment = this.tentacles[i];

            var magnitude = Math.sqrt( 
                Math.pow(this.xDirectionForAttack, 2) + Math.pow(this.yDirectionForAttack, 2) 
                );
            this.xDirectionForAttack /= magnitude;
            this.yDirectionForAttack /= magnitude;

            while (segment.nextSegment != null){
                segment.nextSegment.setTarget(
                    segment.xTarget + (this.xDirectionForAttack * 28), 
                    segment.yTarget + (this.yDirectionForAttack * 28), 
                    200);
                segment = segment.nextSegment;
            }
        }
    }
    else if(!this.tentaclesIsAttacking[i] && 
            !this.retractingTentacle[i] &&
            this.tentacles[i] &&
            game.time.now - this.timeOfInitAttack[i] > 1500){
//        this.retractTentacle(this.tentacles[i], i);
        if(i < game.global.level)
            this.tentacles[i].setInitTarget(this.tentacles[i].xTarget, this.tentacles[i].yTarget, -10);
        else 
            this.tentacles[i].setInitTarget(this.tentacles[i].xTarget, this.tentacles[i].yTarget, 10);

            this.retractingTentacle[i] = true;
    }

//    if (this.retractingTentacle[i] && game.time.now - this.timeOfInitAttack[i] > 2500)
//        this.retractingTentacle[i] = false;
}

function squidAttacks(i){
    if (this.tentacles[i] == null)
        return;

    this.tentaclesIsAttacking[i] = true;
    this.timeOfInitAttack[i] = game.time.now;
    this.setTimeForNextAttack(i);
    this.retractTentacle(this.tentacles[i], i);
}

function retractTentacle(tentacle, position){
    var i=0;
    var segment = tentacle;

    var orientation;
    if (position < game.global.level)
        orientation = -1;
    else
        orientation = 1;

    while (segment.nextSegment != null){
        if (i < 4)
            segment.nextSegment.setTarget(segment.xTarget + (orientation * 5), segment.yTarget - 30, 750);
        else
            segment.nextSegment.setTarget(segment.xTarget + (orientation * 5), segment.yTarget + 30, 750);

        segment = segment.nextSegment;
        i++;
    }
}


function extendTentacle(id){
    if(this.keys.length <= 0)
        return;

    if (id == null){
        id = Math.floor( Math.random() * this.keys.length ); 
    }

    var key = this.keys[id];
    this.keys.splice(id, 1);

    var number = key % (game.global.level * 2);
    var tentacle = this.tentacles[ number ];
    if(this.tentacles[number] != null){
        tentacle.addSegment(key);
    }
    else{
        if(  number < game.global.level ){
            this.tentacles[ number ] = addTentacle( 
                this.xTentaclesPosition + (number * 40), 
                this.body.y + 150, 
                key);
        }
        else
            this.tentacles[ number ] = addTentacle( 
                this.xTentaclesPosition + (number * 40) + 60, 
                this.body.y + 150, 
                key);

    }



    tentacle = this.tentacles[ number ]
    if( number < game.global.level )
        tentacle.setInitTarget(
            this.xTentaclesPosition + (number * 40), 
            this.body.y + 150,
            -10);
    else
        tentacle.setInitTarget(
            this.xTentaclesPosition + (number * 40) + 60, 
            this.body.y + 150,
            10);


    this.setDrawOrder();
   

}

function setSquidDrawOrder(){
    for(var i=0; i < game.global.level; i++){
        if (this.tentacles[i] != null)
            this.tentacles[i].setDrawOrder();
        if (this.tentacles[game.global.level * 2 - i - 1])
            this.tentacles[game.global.level * 2 - i - 1].setDrawOrder();
    }
    player.setDrawOrder();
    winImage.bringToTop();
    loseImage.bringToTop();
    gui.setDrawOrder();
    endImage.bringToTop();

}



function squidTakeDagame(damage){
    this.health -= damage;

    this.healthBar.width = 190 * ( this.health / this.maxHealth);

    if (this.health <= 0){
        gui.upScore(200);

        squid.beak.destroy();

        this.healthBar.visible = false;

        var explosion = explosions.getFirstExists(false);
        explosion.reset(this.body.x, this.body.y);
        explosion.play('kaboom', 30, false, true);

        explosion = explosions.getFirstExists(false);
        explosion.reset(this.body.x + 100, this.body.y + 40);
        explosion.play('kaboom', 30, false, true);

        this.animations.play('die');

        this.hit_sound.play();
        player.setWinState();

        if(segment)
            segment.destroy();
    }
}







