let instance: any;
let counter = 0;

class RabbitMQInstance {
  constructor() {
    if (instance) {
      throw new Error("You can only create one instance!");
    }
    instance = this;
  }

  getInstance() {
    return this;
  }

  connect() {
    return counter;
  }

  disconnect() {
    return ++counter;
  }

  decrement() {
    return --counter;
  }
}

const RabbitMQ = Object.freeze(new RabbitMQInstance());
export default RabbitMQ;
