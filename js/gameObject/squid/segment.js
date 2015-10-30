
function addSegment(){
	var segment;
    segment = game.add.sprite(800, 200, "drone");
    game.physics.enable(segment, Phaser.Physics.ARCADE);
    segment.body.velocity.x = -50;

    segment.update = updateSegment;

    return segment;
}


function updateSegment(){
    if (game.physics.arcade.overlap(this, squid)){
        squid.extendTentacle();
        this.destroy();
        segment = null;
    }
}