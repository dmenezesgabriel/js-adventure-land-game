# Notes

## var, let or const?

## Promises

## Sockets

Get all receiving messages

```js
let original_onevent = socket.onevent;

socket.onevent = function (packet) {
  console.log("INCOMING", JSON.stringify(arguments) + " " + new Date());
  original_onevent.apply(socket, arguments);
};
```

## Classes

- **constructor**: Same as `__init__`
  Python:

  ```py
  class User():
      def __init__(self, name):
          self.name = name
  ```

  JavaScript:

  ```js
  class User {
    constructor(name) {
      this.name = name;
    }
  }
  ```
