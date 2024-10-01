import app from "./app";
import { RedisClient } from "@analytiq/shared";
import { VisitorConnectionSubscriber } from "./events/subscribers/visitor-connection";
import { VisitorReconnectionSubscriber } from "./events/subscribers/visitor-reconnection";
import { VisitorNavigationSubscriber } from "./events/subscribers/visitor-navigation";
import { VisitorVisibilityChangeSubscriber } from "./events/subscribers/visitor-visibility-change";
import { VisitorDisconnectionSubscriber } from "./events/subscribers/visitor-disconnection";

const startUp = async () => {
  RedisClient.initialize(process.env.REDIS_URL);
  await RedisClient.connect();

  VisitorConnectionSubscriber.instance().subscribe(RedisClient.subscriber());
  VisitorReconnectionSubscriber.instance().subscribe(RedisClient.subscriber());
  VisitorNavigationSubscriber.instance().subscribe(RedisClient.subscriber());
  VisitorVisibilityChangeSubscriber.instance().subscribe(
    RedisClient.subscriber()
  );
  VisitorDisconnectionSubscriber.instance().subscribe(RedisClient.subscriber());

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

startUp();
