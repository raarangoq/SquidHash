

function addAttack(){
	var attack = game.make.sprite(19, 34 + 16, 'attack');
	game.physics.enable(attack, Phaser.Physics.ARCADE);
	attack.body.colliderWorldBounds = true;

	attack.frame = 3;
	attack.hitEnemy = false;



	attack.changeAttackOrientation = changeAttackOrientation;
	attack.setAttackFrame = setAttackFrame;
	attack.attackHitEnemy = attackHitEnemy;

	return attack;
}


function changeAttackOrientation(orientation, player){
	if(orientation == 'right'){
		this.body.x = player.body.x + 35;
		this.body.y = player.body.y;
	}else if(orientation == 'left'){
		this.body.x = player.body.x - 40;
		this.body.y = player.body.y;
	}else if(orientation == 'front'){
		this.body.x = player.body.x;
		this.body.y = player.body.y + 40;
	}else if(orientation == 'back'){
		this.body.x = player.body.x; 
		this.body.y = player.body.y - 50;
	}

	this.setAttackFrame(orientation);

}

function setAttackFrame(orientation){
	if(orientation == 'right')
		this.frame = 2;
	else if(orientation == 'left')
		this.frame = 0;
	else if(orientation == 'front')
		this.frame = 3;
	else 
		this.frame = 1;
}

function attackHitEnemy(enemy){
	if (player.is_attacking && this.hitEnemy){
        if (game.physics.arcade.overlap(this, enemy) ){
         	enemy.takeDamage(player.hitDamage);
         	this.hitEnemy = false;
//        	if (enemy.health <= 0){
//         		enemy.destroy();
//         	}
        }
    }
}