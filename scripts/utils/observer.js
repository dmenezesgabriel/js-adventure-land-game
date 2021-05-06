class Observer {
  // Log character events
  constructor(obj) {
    obj.all(function (name, data) {
      data.event_name = name;
      console.log(JSON.stringify(data));
    });
  }
}

const characterObserver = new Observer(character);
// const gameObserver = new Observer(game);
