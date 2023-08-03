game_log("Hello");
// show_json(character);
game_log(parent.character.hp);
game_log(parent.character.x);
game_log(get_nearest_monster({ max_att: 100, min_xp: 10, target: "Name", no_target: true }));
// smart_move("goo");
smart_move({ x: 0, y: 0, map: "main" });
