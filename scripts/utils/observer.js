class Observer {
  // Log character events
  constructor(character) {
    character.all(function (name, data) {
      data.event_name = name;
      console.log(data);
    });
  }
}

const observer = new Observer(character);
