class Observer {
  // Log character events
  constructor(obj) {
    obj.all(function (name, data) {
      // Set event name
      data.event_name = name;

      const combat_events = ["incoming", "hit", "target_hit"];
      // Get entity name for each event
      if (combat_events.includes(data.event_name)) {
        data.target_name = get_entity(data.target).name;
        data.actor_name = get_entity(data.actor).name;
      }
      console.log(JSON.stringify(data));
    });
  }
}

const characterObserver = new Observer(character);
// const gameObserver = new Observer(game);
