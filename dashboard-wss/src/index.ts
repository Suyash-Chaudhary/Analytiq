import { RedisClient } from "@analytiq/shared";
import app from "./app";
import { SubscriptionManager } from "./state/subscription-manager";
import { WebsocketManager } from "./state/websocket-manager";

const startup = async () => {
  RedisClient.initialize(process.env.REDIS_URL);
  await RedisClient.connect();

  SubscriptionManager.initialize();
  WebsocketManager.initialize();

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

startup();
