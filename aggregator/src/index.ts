import app from "./app";
import { RedisClient } from "@analytiq/shared";
import { VisitorConnectionSubscriber } from "./events/subscribers/visitor-connection";
import { VisitorReconnectionSubscriber } from "./events/subscribers/visitor-reconnection";
import { VisitorNavigationSubscriber } from "./events/subscribers/visitor-navigation";
import { VisitorVisibilityChangeSubscriber } from "./events/subscribers/visitor-visibility-change";

const startUp = async () => {
  RedisClient.initialize(process.env.REDIS_URL);
  await RedisClient.connect();

  VisitorConnectionSubscriber.instance().subscribe(RedisClient.client());
  VisitorReconnectionSubscriber.instance().subscribe(RedisClient.client());
  VisitorNavigationSubscriber.instance().subscribe(RedisClient.client());
  VisitorVisibilityChangeSubscriber.instance().subscribe(RedisClient.client());

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

startUp();
