const autoHP = 0.5;
const autoMP = 0.5;
const loopInterval = 1000 / 4;
const deathCheckInterval = 10000;

var oldLocation;
var justRespawned = false;

function characterLog(message) {
  console.log(`${character.name} - ${message}`);
}

// Return the character empty's slot number
function emptySlots() {
  return character.esize; // Game Built-in
}

// Returns the number of itens in your inventory for a given name;
function num_items(name) {
  var item_count = character.items
    .filter((item) => item != null && item.name == name.toLowerCase())
    .reduce(function (a, b) {
      return a + (b["q"] || 1);
    }, 0);
  return item_count;
}

// Potions and looting
setInterval(() => {
  // loot monster drops
  characterLog("Trying to loot");
  loot(); // Game Built-in

  // Use potions
  if (
    character.hp / character.max_hp <= autoHP ||
    character.mp / character.max_mp <= autoMP
  ) {
    characterLog(`HP: ${character.hp} MP: ${character.mp}`);
    characterLog("Consuming potions");
    use_hp_or_mp(); // Game Built-in
  }
}, loopInterval);

// Check if player is dead and respawn it
setInterval(() => {
  if (character.rip) {
    characterLog("Died, respawning");
    oldLocation = {
      x: character.real_x,
      y: character.real_y,
      map: character.map,
    };
    respawn(); // Game Built-in
    justRespawned = true;
    return 1;
  } else if (justRespawned) {
    // Move to character's death location
    characterLog("Just Respawned");
    smartMove(oldLocation);
    justRespawned = false;
    oldLocation = {};
  } else {
    characterLog("Death check pass");
    // pass
  }
}, deathCheckInterval);
