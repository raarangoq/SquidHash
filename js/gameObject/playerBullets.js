

function addTorpedo(){

    if(player.direction == "front"){
        torpedo = game.add.sprite( player.body.x + 15, player.body.y + 60, 'bombArrow');
        game.physics.enable(torpedo, Phaser.Physics.ARCADE);
        torpedo.body.acceleration.y = +300;
        torpedo.angle = 180;
    }
    else if(player.direction == "back"){
        torpedo = game.add.sprite( player.body.x + 15, player.body.y - 40 , 'bombArrow');
        game.physics.enable(torpedo, Phaser.Physics.ARCADE);
        torpedo.body.acceleration.y = -300;
        //torpedo.angle = 180;
    }
    else if(player.direction == "right"){
        torpedo = game.add.sprite( player.body.x + 50, player.body.y, 'bombArrow');
        game.physics.enable(torpedo, Phaser.Physics.ARCADE);
        torpedo.body.acceleration.x = +300;
        torpedo.angle = 90;
    }
    else{
        torpedo = game.add.sprite( player.body.x - 30, player.body.y, 'bombArrow');
        game.physics.enable(torpedo, Phaser.Physics.ARCADE);
        torpedo.body.acceleration.x = -300;
        torpedo.angle = -90;
    }

    
    torpedo.anchor.setTo(0.5, 0.5);
    torpedo.animations.add('fly', [0, 1], 6, true);
    torpedo.play('fly');



    torpedo.damage = 150;

    torpedo.sound = game.add.audio("torpedo", 0.5);
    torpedo.sound.play();

    gui.changeAbility(false, "torpedo");

    return torpedo;
}