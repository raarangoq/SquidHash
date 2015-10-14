var image;



initMenu = {
	create: function(){
		image = game.add.sprite(0, 0, 'initmenu');
//		game.global.is_playing = false;

		
	},

	update: function(){
		if(keyboard.enterKey()){
//			game.global.is_playing = true;
			game.state.start('levels');
		}


	}
}