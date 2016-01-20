var loadingImage;

boot = {
	preload: function(){
		game.load.image('loading', 'assets/pics/loading.png');
	},

	create: function(){
		loadingImage = game.add.sprite(400, 300, 'loading');
		loadingImage.anchor.setTo(0.5, 0.5);
		loadingImage.scale.setTo(0.5, 0.5);
		game.physics.enable(loadingImage, Phaser.Physics.ARCADE);
		loadingImage.body.angularVelocity = 180;

		game.state.start('loading', false);
	},

}