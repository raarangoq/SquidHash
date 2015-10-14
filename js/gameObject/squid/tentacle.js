
function addTentacle(x, y){
	var tentacle;
    tentacle = game.add.sprite(x, y, "drone");
    game.physics.enable(tentacle, Phaser.Physics.ARCADE);

    
    




    return tentacle;
}