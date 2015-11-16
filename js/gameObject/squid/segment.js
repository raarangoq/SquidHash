
function addSegment(){
	var segment;
    segment = game.add.sprite(squid.body.x + 600, squid.body.y + 50, "drone");
    game.physics.enable(segment, Phaser.Physics.ARCADE);
    segment.body.velocity.x = -100;


    segment.id = Math.floor(Math.random() * squid.keys.length);

    var textId = game.add.text(10, 0, squid.keys[segment.id], { fontSize: '14px', fill: '#ffffff'});
    var child = segment.addChild(textId);
    game.physics.enable(child, Phaser.Physics.ARCADE);


    segment.update = updateSegment;

    return segment;
}


function updateSegment(){
    if (game.physics.arcade.overlap(this, squid)){
        squid.extendTentacle(this.id);
        timeSpam = game.time.now;
        this.destroy();
        segment = null;
    }
}