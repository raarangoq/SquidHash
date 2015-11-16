

function addTorpedo(){


    torpedo = game.add.sprite( player.body.x + 15, player.body.y - 20 , 'bombArrow');
    torpedo.anchor.setTo(0.5, 0.5);
    torpedo.animations.add('fly', [0, 1], 6, true);
    game.physics.enable(torpedo, Phaser.Physics.ARCADE);
    torpedo.body.colliderWorldBounds = true;
    torpedo.play('fly');
    torpedo.body.acceleration.y = -300;

    torpedo.damage = 50;

    torpedo.sound = game.add.audio("torpedo", 0.5);
    torpedo.sound.play();

    gui.changeAbility(false, "torpedo");

    return torpedo;
}