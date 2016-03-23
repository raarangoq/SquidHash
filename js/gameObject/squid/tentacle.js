
function addTentacle(x, id){
	var tentacle;
    tentacle = game.add.sprite(x, 150, "segment");
    game.physics.enable(tentacle, Phaser.Physics.ARCADE);
    tentacle.body.immovable = true;

//var mod = id % (game.global.level * 2);

    var textId = game.add.text(10, 0, id, 
    	{ font: '14px ferney', fill: '#fff', stroke: '#000000', strokeThickness: 3 });
    var child = tentacle.addChild(textId);
    game.physics.enable(child, Phaser.Physics.ARCADE);

    tentacle.damage = 20 + (game.global.level * 8);
    
    tentacle.id = id;
    tentacle.xTarget = x;
    tentacle.yTarget = 150;

    tentacle.health = 10;

    tentacle.hit_sound = game.add.audio('rugido');

    tentacle.previousSegment = null;
    tentacle.nextSegment = null;

    tentacle.update = updateTentacle;
    tentacle.addSegment = addTentacleSegment;
    tentacle.setTarget = setTentacleTarget;
    tentacle.setInitTarget = setInitTarget;
    tentacle.takeDamage = tentacleTakeDamage;
    tentacle.setDrawOrder = setTentacleDrawOrder;
    tentacle.checkSegmentPosition = checkSegmentPosition;

    tentacle.setFrameSegment = setFrameSegment;

    return tentacle;
}

function updateTentacle(hitTorpedo){
	if (!this.body)
		return;

	if(!hitTorpedo)
		hitTorpedo = false;


	if( game.physics.arcade.distanceToXY(this, this.xTarget, this.yTarget) < 30 ){ 
        this.body.velocity.setTo(0,0);
        this.setTarget(this.xTarget, this.yTarget, 200)

        if(game.physics.arcade.distanceToXY(this, this.xTarget, this.yTarget) < 10){
        	this.body.x = this.xTarget;
        	this.body.y = this.yTarget;
        }
    }

    if (game.physics.arcade.collide(this, player)){
    	if(player.canMove)
    		player.hitPlayer(this);
    }

    if (torpedo && game.physics.arcade.overlap(this, torpedo)){
    	hitTorpedo = true;
    	boom_sound.play();
    	torpedo.destroy();
    }

	if (this.nextSegment != null){
    	this.nextSegment.update(hitTorpedo);   	
    }
    else{
    	player.attack.attackHitEnemy(this);
    	if(this.health <= 0)
    		return;
    }
    

    if(winState || (hitTorpedo && this.previousSegment != null)){
    	if(hitTorpedo){
    		//  And create an explosion :)
	        var explosion = explosions.getFirstExists(false);
	        explosion.reset(this.body.x, this.body.y);
	        explosion.play('kaboom', 30, false, true);
    	}
    	this.takeDamage(this.health + 20);
    }
}

function tentacleTakeDamage(damage){
	if(this.previousSegment == null && !winState)
		return;

	this.health -= damage;


	if (this.health <=0 ){
		gui.upScore(20);

		if (this.previousSegment != null){
			this.previousSegment.nextSegment = null;
			this.previousSegment.setFrameSegment();
		}
//		else
//			squid.tentacles[Math.floor(this.id/10)] = null;

		squid.keys.push(this.id);

		if (!winState && !items){
			if (Math.random() < 0.1)
				items = addItem(squid.body.x + 100, squid.body.y + 100, "torpedo");
			else if(Math.random() < 0.1)
				items = addItem(squid.body.x + 100, squid.body.y + 100, "velocity");


		}
		if(!winState)
			this.hit_sound.play();
		this.destroy();

		
	}
}

function setFrameSegment(){
	if(this.previousSegment == null || this.nextSegment != null)
		this.frame = 0;
	else{
		if(this.id % (game.global.level * 2) >= game.global.level)
			this.frame = 1;
		else
			this.frame = 2;
	}
}

function addTentacleSegment(id){
	if(this.nextSegment){
		this.nextSegment.addSegment(id);
		return;
	}

	var number = id % (game.global.level * 2);
	var x = squid.xTentaclesPosition + (number * 40);
	if(number >= game.global.level)
		x += 60;
	var segment = addTentacle( x, id);

	this.nextSegment = segment;
	segment.previousSegment = this;

	this.nextSegment.setFrameSegment();
	this.setFrameSegment();

}

function setTentacleDrawOrder(){
	this.bringToTop();
	if(this.nextSegment != null)
		this.nextSegment.setDrawOrder();

}

function setTentacleTarget(x, y, time){
	this.xTarget = x;
	this.yTarget = y;
	game.physics.arcade.moveToXY(this, x, y, null,  time);
}

function checkSegmentPosition(position){
	if (position == 2 || position == 3 || position == 6 || position == 7 || position == 10)
		return false;
	return true;
}

function setInitTarget(x, y, orientation, position){
	position || (position = 0);

	this.setTarget(x, y, 1000);
//	this.xTarget = x;
//	this.yTarget = y;
//	game.physics.arcade.moveToXY(this, this.xTarget, this.yTarget, 200);

	
	if (this.nextSegment != null){
		if( this.checkSegmentPosition(position) )
			this.nextSegment.setInitTarget(x + (orientation * 2), y + 15, orientation, position + 1);
		else
			this.nextSegment.setInitTarget(x - (orientation), y + 25, orientation, position + 1);
	}
}