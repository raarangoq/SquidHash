




// Agregar la interfaz de salud del jugador, solo se invoca al inicio
function addLivesBar(){
    var livesBar = game.add.sprite(650, 495, 'healthBar');

    lives = 3;
    livesBar.heart = [];

	for (var i = 0; i < lives; i++) 
    {
        livesBar.heart[i] = game.add.sprite(663 + (30 * i), 505, 'heart');
        livesBar.heart[i].scale.setTo(1.5, 1.5);
        livesBar.heart[i].frame = 0;
    }
    livesBar.health = game.add.text(650, 540, 'Salud : ', { font: '16px Arial', fill: '#fff' });


    livesBar.updateLivesBar = updateLivesBar;

    return livesBar;
}

function updateLivesBar(){
    this.health.text = 'Salud: ' + game.global.health;

    if (game.global.lives <= 2)
        this.heart[0].visible = false;

    if (game.global.lives <= 1)
        this.heart[1].visible = false;

    if (game.global.lives == 0)
        this.heart[2].visible = false;
}