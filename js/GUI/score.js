
function addScore(){
	//  The score
    scoreString = 'Puntaje: ';
    scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });

    scoreText.upScore = upScore;

    scoreText.setDrawOrder = scoreSetDrawOrder;

    return scoreText;
}


function upScore(value){
	score += value;
    scoreText.text = scoreString + score;
}

function scoreSetDrawOrder(){
	this.bringToTop();
}