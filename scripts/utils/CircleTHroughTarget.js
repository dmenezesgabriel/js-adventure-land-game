setInterval(function(){
	game_log("MAking Circles")
	let target=get_targeted_monster();

	let radius = character.range - 50;
	let theta = Math.atan2(character.y-target.y, character.x-target.x) + (180/Math.PI);
	move(
		target.x + radius * Math.cos(theta),
		target.y + radius * Math.sin(theta)
	);
},1000/4); // Loops every 1/4 seconds.