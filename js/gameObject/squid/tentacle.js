
function addTentacle(x, y, id){
	var tentacle;
    tentacle = game.add.sprite(x, y, "drone");
    game.physics.enable(tentacle, Phaser.Physics.ARCADE);


    var textId = game.add.text(10, 0, id, { fontSize: '14px', fill: '#ffffff'});
    var child = tentacle.addChild(textId);
    game.physics.enable(child, Phaser.Physics.ARCADE);

    
    tentacle.id = id;
    tentacle.xTarget = x;
    tentacle.yTarget = y;

    tentacle.health = 10;

    tentacle.previousSegment = null;
    tentacle.nextSegment = null;

    tentacle.update = updateTentacle;
    tentacle.addSegment = addTentacleSegment;
    tentacle.setTarget = setTentacleTarget;
    tentacle.setInitTarget = setInitTarget;
    tentacle.takeDamage = tentacleTakeDamage;

    return tentacle;
}

function updateTentacle(){
	if( game.physics.arcade.distanceToXY(this, this.xTarget, this.yTarget) < 5 ) 
        this.body.velocity.setTo(0,0);

    if (this.nextSegment != null)
    	this.nextSegment.update();
    else{
    	player.attack.attackHitEnemy(this);
    }
}

function tentacleTakeDamage(damage){
	this.health -= damage;
	if (this.health <=0 ){

		if (this.previousSegment != null)
			this.previousSegment.nextSegment = null;
		else{
			squid.tentacles[Math.floor(this.id/10)] = null;
		}
		squid.keys.push(this.id);
		//this.destroy();
	}
}


function addTentacleSegment(id){
	if (this.id < id){
		// Avanzar en la lista
		if (this.nextSegment != null)
			this.nextSegment.addSegment(id);
		// Se llegó al último elemento
		else{
			var tentacle = squid.tentacles[Math.floor(id/10)];
			var segment = addTentacle(tentacle.body.x, tentacle.body.y + 20, id);
			this.nextSegment = segment;
			segment.previousSegment = this;
		}
	}
	else{
		// Insertar en medio de dos segmentos
		if (this.previousSegment != null){
			var tentacle = squid.tentacles[Math.floor(id/10)];
			var segment = addTentacle(tentacle.body.x, tentacle.body.y + 20, id);
			segment.previousSegment = this.previousSegment;
			segment.nextSegment = this;
			this.previousSegment.nextSegment = segment;
			this.previousSegment = segment;
		}
		// Insertar al inicio de la lista
		else{
			var x = squid.body.x - 40 + (id/10 * 40);
			var segment = addTentacle( x, squid.body.y + 200, id);
			this.previousSegment = segment;
			segment.nextSegment = this;
			squid.tentacles[Math.floor(id/10)] = segment;
		
		}
	}
}

function setTentacleTarget(x, y, time){
	this.xTarget = x;
	this.yTarget = y;
	game.physics.arcade.moveToXY(this, x, y, null,  time);
}


function setInitTarget(x, y){
	this.xTarget = x;
	this.yTarget = y;
	game.physics.arcade.moveToXY(this, x, y, 200);

	if (this.nextSegment != null)
		this.nextSegment.setInitTarget(x, y + 25);
}