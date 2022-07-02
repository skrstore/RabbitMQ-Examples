import { Connection } from "amqplib";
import { connect } from "amqplib/callback_api";

const RABBITMQ_URL = "amqp://admin:admin@localhost";

const connectRabbitMQ = () => {
  return new Promise<Connection>((resolve: any, reject) => {
    connect(RABBITMQ_URL, function (error, connection) {
      if (error) {
        reject(error);
      }
      resolve(connection);
    });
  });
};

(async () => {
  const rmqConnection = await connectRabbitMQ();
  const rmqChannel = await rmqConnection.createChannel();

  const queue = "hello";
  const msg = "Hello World!";

  rmqChannel.assertQueue(queue, {
    durable: false,
  });
  rmqChannel.sendToQueue(queue, Buffer.from(msg));

  console.log(" [x] Sent %s", msg);
  setTimeout(function () {
    rmqConnection.close();
    process.exit(0);
  }, 500);
})();
