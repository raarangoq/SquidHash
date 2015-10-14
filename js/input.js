

function addKeyboard(){
	
	// Atributos

	// El teclado para procesar la entrada
	keyboard = game.input.keyboard;	

	// Metodos
	keyboard.downKey = downKey;
	keyboard.enterKey = enterKey;
	keyboard.gKey = gKey;
	keyboard.leftKey = leftKey;
	keyboard.rightKey = rightKey;
	keyboard.spaceKey = spaceKey;
	keyboard.upKey = upKey;

}

function downKey(){
	if(this.isDown(Phaser.Keyboard.DOWN) || this.isDown(Phaser.Keyboard.S)){
		return true;
	}
	return false;
}

function enterKey(){
	if(this.isDown(Phaser.Keyboard.ENTER)){
		return true;
	}
	return false;
}

function gKey(){
	if(this.isDown(Phaser.Keyboard.G)){
		return true;
	}
	return false;
}

function leftKey(){
	if(this.isDown(Phaser.Keyboard.LEFT) || this.isDown(Phaser.Keyboard.A)){
		return true;
	}
	return false;
}


function rightKey(){
	if(this.isDown(Phaser.Keyboard.RIGHT) || this.isDown(Phaser.Keyboard.D)){
		return true;
	}
	return false;
}

function spaceKey(){
	if(this.isDown(Phaser.Keyboard.SPACEBAR)){
		return true;
	}
	return false;
}

function upKey(){
	if(this.isDown(Phaser.Keyboard.UP) || this.isDown(Phaser.Keyboard.W)){
		return true;
	}
	return false;
}





