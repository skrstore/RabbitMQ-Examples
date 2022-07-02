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

  rmqChannel.assertQueue(queue, {
    durable: false,
  });

  console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

  rmqChannel.consume(
    queue,
    (msg: any) => {
      console.log(" [x] Received %s", msg.content.toString());
    },
    { noAck: true }
  );
})();
