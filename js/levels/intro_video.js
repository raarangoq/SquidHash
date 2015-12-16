
var sky;
var dialog;
var link;
var cloud;
var music;

var time;

var text;

intro_video = {
	create: function(){
		sky = game.add.sprite(0, 0, 'sky');

		cloud = game.add.sprite(300, 100, 'cloud');
		cloud.scale.setTo(0.3, 0.5);
		game.physics.enable(cloud, Phaser.Physics.ARCADE);
		cloud.body.velocity.x= 2;
		cloud = game.add.sprite(-30, 130, 'cloud');
		cloud.scale.setTo(0.7, 0.3);
		game.physics.enable(cloud, Phaser.Physics.ARCADE);
		cloud.body.velocity.x= 3;
		cloud = game.add.sprite(400, 50, 'cloud');
		cloud.scale.setTo(0.1, 0.1);
		game.physics.enable(cloud, Phaser.Physics.ARCADE);
		cloud.body.velocity.x= 3;



		dialog = game.add.sprite(230, 300, 'dialog');
		dialog.visible = false;

		link = game.add.sprite(1000, 600, 'link');
		link.animations.add('go', [0, 1, 2, 3], 10, true);
		link.animations.play('go');

		game.physics.enable(link, Phaser.Physics.ARCADE);
		link.scale.setTo(1.5, 1.5);

		game.global.is_playing = false;
		time = game.time.time;
		game.physics.arcade.moveToXY(link, 550, 350, 350);

		music = game.add.sound('levelB', 0.5, true);
		music.play();

		text = game.add.text(dialog.x + dialog.width / 2, dialog.y + dialog.height / 2, '', 
			{ font: "12pt ferney", fill: '#fff', stroke:  '#000000', strokeThickness: 3,
			wordWrap: true, wordWrapWidth: dialog.width, align: "center"});
		text.anchor.set(0.5);

	},

	update: function(){
		if(keyboard.enterKey()){
			this.playGame();
		}

		this.playIntro();

	},

	setText: function(value){
		if(value == 1){
			dialog.visible = true;
			text.text = 'Un grupo de calamares gigantes está atacando el muelle.';
		}
		else if(value ==2){
			dialog.position.setTo(230, 330);
			text.text = 'Ve allí y acaba con ellos, pero recuerda que son muy fuertes.';
		}

		text.position.setTo(dialog.x + dialog.width / 2 + 4, dialog.y + dialog.height / 2);
		
	},


	playIntro: function(){
		var local_time = game.time.time - time;

		if( game.physics.arcade.distanceToXY(link, 550, 350) <= 10 )
			link.body.velocity.setTo(0, 0);

		if(local_time < 3000){
			return;
		}
		else if(local_time < 10000){
			this.setText(1);
		}
		else if(local_time < 20000){
			this.setText(2);
		}
		else if(local_time < 25000){
			dialog.visible = false;
			text.text = '';
			game.physics.arcade.moveToXY(link, 1200, 1000, 300);
		} 
	},

	playGame: function(){
		music.destroy();
		game.state.start('levels');
	}, 

	render: function(){

	}
}