function getTarget() {
  let target = get_targeted_monster();
  if (!target) {
    target = get_nearest_monster();
    if (target) change_target(target);
    else {
      set_message("No target available");
      return;
    }
  }
  return target;
}

function circleTarget(character, target) {
  let radius = character.range - 50;
  let theta = Math.atan2(character.y - target.y, character.x - target.x) + 180 / Math.PI;

  draw_circle(target.x, target.y, radius, 1, 0x00ff00);
  move(target.x + radius * Math.cos(theta), target.y + radius * Math.sin(theta));
}

function main() {
  let attackMode = true;

  game_log("Hello", "white");

  setInterval(function () {
    use_hp_or_mp();
    loot();

    if (!attackMode || character.rip || is_moving(character)) return;

    let target = getTarget();
    if (target) {
      if (!is_in_range(target)) {
        move(character.x + (target.x - character.x) / 2, character.y + (target.y - character.y) / 2);
      } else if (can_attack(target)) {
        attack(target);
        circleTarget(character, target);
      }
    }

    clear_drawings();
  }, 1000 / 4);
}

main();
