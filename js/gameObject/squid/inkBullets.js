var enemyBullet;



function addInkBullets(){
	// The enemy's bullets
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullets.createMultiple(10, 'enemyBullet');
    enemyBullets.setAll('anchor.x', 0.5);
    enemyBullets.setAll('anchor.y', 1);
    enemyBullets.setAll('outOfBoundsKill', true);
    enemyBullets.setAll('checkWorldBounds', true);

    enemyBullets.damage = 10;

    enemyBullets.fireInkBullet = fireInkBullet;


}

function fireInkBullet(){

	//  Grab the first bullet we can from the pool
    enemyBullet = this.getFirstExists(false);

    if (enemyBullet && !game.physics.arcade.isPaused)
    {
        // And fire the bullet from this enemy
        enemyBullet.reset(squid.body.x + 100, squid.body.y + 100);
        //game.physics.arcade.moveToObject(enemyBullet, player, 120);
        game.physics.arcade.moveToXY(enemyBullet, player.body.x, player.body.y, 120);
    }
}