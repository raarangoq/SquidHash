
function addSquid(x, y){

    var squid;
    squid = game.add.sprite(x, y, "boss");
    game.physics.enable(squid, Phaser.Physics.ARCADE);

    squid.tentacles = [];




    addTentacles(squid);




    return squid;
}

function addTentacles(squid){
    for (var i=0; i<10; i++){
        squid.tentacles[i] = addTentacle( squid.body.x - 40 + (i*40), squid.body.y + 200);
    }
}




