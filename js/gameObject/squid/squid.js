
function addSquid(x, y){

    var squid;
    squid = game.add.sprite(x, y, "boss");
    game.physics.enable(squid, Phaser.Physics.ARCADE);

    squid.tentacles = [];
    squid.tentaclesIsAttacking = [];
    squid.keys = [];

    for(i=0; i<10 * game.global.level * 2; i++){
        squid.keys[i] = i;
    }

    squid.health = 300;
    squid.maxHealth = 300;

    squid.healthBar = game.add.sprite(100,  20, 'enemyBar');
    squid.healthBar.width = 120;
    squid.addChild(squid.healthBar);

    squid.update = updateSquid;
    squid.extendTentacle = extendTentacle;
    squid.attack = squidAttacks;
    squid.retractTentacle = retractTentacle;
    squid.takeDamage = squidTakeDagame;

    addTentacles(squid);
    return squid;
}

function addTentacles(squid){
    for (var i= game.global.level * 2 - 1; i>=0; i--){
        squid.tentacles[i] = addTentacle( squid.body.x - 40 + (i*40), squid.body.y + 200, i * 10 );
        squid.tentaclesIsAttacking[i] = false;
        squid.keys.splice(i*10, 1);
    }
}

function updateSquid(){
    player.attack.attackHitEnemy(this);

    for(var i=0; i<10; i++){
        if(this.tentacles[i] != null)
            this.tentacles[i].update();
    }

    if (this.tentaclesIsAttacking[2] && this.tentacles[2] != null){
        if (game.time.now - time > 1900){
            this.tentaclesIsAttacking[2] = false;
            var segment = this.tentacles[2];

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
}

var time = 0;

function extendTentacle(){
    if(squid.keys.length <= 0)
        return;
    

    var id = Math.random() * squid.keys.length;
    var key = squid.keys[Math.floor(id)];

    var tentacle = this.tentacles[ Math.floor(key/10) ];
    if (tentacle != null){
        this.tentacles[ Math.floor(key/10) ].addSegment(key);
    }
    else
        this.tentacles[ Math.floor(key/10) ] = addTentacle( 
            squid.body.x - 40 + (Math.floor(key/10)*40), 
            squid.body.y + 200, 
            key);

    tentacle = this.tentacles[ Math.floor(key/10) ]

if (tentacle.nextSegment != null)
        texta.text = tentacle.id + '\n' + tentacle.nextSegment.id;  

    tentacle.setInitTarget(squid.body.x - 40 + (Math.floor(key/10)*40), squid.body.y + 200);

    squid.keys.splice(Math.floor(id), 1);

}

function squidAttacks(){
    this.tentaclesIsAttacking[2] = true;
    time = game.time.now;

    if (this.tentacles[2] != null)
        this.retractTentacle(this.tentacles[2]);
}

function squidTakeDagame(damage){
    this.health -= damage;

    this.healthBar.width = 120 * ( this.health / this.maxHealth);
}

function retractTentacle(tentacle){
    var i=0;
    var segment = tentacle;
    while (segment.nextSegment != null){
        if (i<4){
            segment.nextSegment.setTarget(segment.xTarget - 5, segment.yTarget - 30, 750);
        }
        else{
            segment.nextSegment.setTarget(segment.xTarget - 5, segment.yTarget + 30, 750);
        }
        segment = segment.nextSegment;

        i++;
    }
}





