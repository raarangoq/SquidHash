
function addScore(){
	//  The score
    scoreString = 'Score : ';
    scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });

    scoreText.upScore = upScore;


    return scoreText;
}


function upScore(value){
	score += value;
    scoreText.text = scoreString + score;
}