
function addSquid(x, y){

    var squid;
    squid = game.add.sprite(x, y, "boss");
    game.physics.enable(squid, Phaser.Physics.ARCADE);

    squid.tentacles = [];
    squid.tentaclesIsAttacking = [];
    squid.retractingTentacle = [];
    squid.xTentaclesPosition;
    squid.keys = [];
    squid.timeOfInitAttack = [];

    squid.lowerTimeBetweenAttacks = 5000 - (game.global.level * 500);
    squid.highTimeBetweenAttacks = 8000 - (game.global.level * 500);
    squid.timeForNextAttack = game.time.now + squid.highTimeBetweenAttacks;

    squid.timeBetweenInks = 1500;
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

    squid.health = 300;
    squid.maxHealth = 300;

    squid.healthBar = game.add.sprite(100,  20, 'enemyBar');
    squid.healthBar.width = 120;
    squid.addChild(squid.healthBar);

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

function addTentacles(squid){
    if (game.global.level == 5){
        squid.xTentaclesPosition = squid.body.x - 70;
    }
    else if(game.global.level == 4){
        squid.xTentaclesPosition = squid.body.x - 30;
    }
    else if(game.global.level == 3){
        squid.xTentaclesPosition = squid.body.x + 10;
    }
    else if(game.global.level == 2){
        squid.xTentaclesPosition = squid.body.x + 50;
    }
    else
        squid.xTentaclesPosition = squid.body.x + 90;

    for (var i = game.global.level * 2 - 1; i>=0; i--){

        if ( i < game.global.level )
            squid.tentacles[i] = addTentacle( 
                squid.xTentaclesPosition + (i*40), 
                squid.body.y + 200, 
                i * 10 );
        else
            squid.tentacles[i] = addTentacle( 
                squid.xTentaclesPosition + (i*40) + 60, 
                squid.body.y + 200, 
                i * 10 );

        squid.tentaclesIsAttacking[i] = false;
        squid.keys.splice(i*10, 1);
    }
}

function updateSquid(){
    player.attack.attackHitEnemy(this);

    for(var i=0; i< game.global.level * 2; i++){
        if(this.tentacles[i] != null)
            this.tentacles[i].update();
    }

    if (!winState){
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
        if (game.time.now - this.timeOfInitAttack[i] > 1000){
            this.tentaclesIsAttacking[i] = false;
            this.retractingTentacle[i] = false;

            var segment = this.tentacles[i];

            var xDirection = player.body.x - segment.body.x;
            var yDirection = player.body.y - segment.body.y;
            var magnitude = Math.sqrt( Math.pow(xDirection, 2) + Math.pow(yDirection, 2) );
            xDirection /= magnitude;
            yDirection /= magnitude;

            while (segment.nextSegment != null){
                segment.nextSegment.setTarget(
                    segment.xTarget + (xDirection * 28), 
                    segment.yTarget + (yDirection * 28), 
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

    var tentacle = this.tentacles[ Math.floor(key/10) ];
    if(tentacle != null){
        tentacle.addSegment(key);
    }
    else{
        if(  Math.floor(key/10) < game.global.level ){
            this.tentacles[ Math.floor(key/10) ] = addTentacle( 
                this.xTentaclesPosition + (Math.floor(key/10)*40), 
                this.body.y + 200, 
                key);
        }
        else
            this.tentacles[ Math.floor(key/10) ] = addTentacle( 
                this.xTentaclesPosition + (Math.floor(key/10)*40) + 60, 
                this.body.y + 200, 
                key);

    }



    tentacle = this.tentacles[ Math.floor(key/10) ]
    if( Math.floor(key/10) < game.global.level )
        tentacle.setInitTarget(
            this.xTentaclesPosition + (Math.floor(key/10)*40), 
            this.body.y + 200,
            -10);
    else
        tentacle.setInitTarget(
            this.xTentaclesPosition + (Math.floor(key/10)*40) + 60, 
            this.body.y + 200,
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
}



function squidTakeDagame(damage){
    this.health -= damage;

    this.healthBar.width = 120 * ( this.health / this.maxHealth);

    if (this.health <= 0){
        this.healthBar.visible = false;
        winState = true;
    }
}







