class Observer {
  /**
   * Listen to socket events through game built-in events subscribing
   *
   * @param obj can be character or game object
   */

  constructor(obj) {
    obj.all(function (name, data) {
      // Set event name
      data.event_name = name;

      const combatEvents = ["incoming", "hit", "target_hit"];
      // Get entity name for each combat related event
      if (combatEvents.includes(data.event_name)) {
        data.target_name = get_entity(data.target).name;
        data.actor_name = get_entity(data.actor).name;
      }
      // Deal with JSHandle@object
      console.log(JSON.stringify(data));
    });
  }
}

const characterObserver = new Observer(character);
// const gameObserver = new Observer(game);
