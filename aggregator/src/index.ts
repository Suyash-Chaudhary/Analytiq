import app from "./app";
import { handleConnectionEvent } from "./events/handlers/connection";
import { handleNavigationEvent } from "./events/handlers/navigation";
import { handleReconnectionEvent } from "./events/handlers/reconnection";
import { handleVisibilityChangeEvent } from "./events/handlers/visibility-change";
import RedisClient from "./redis-client";
import RedisPubSubSubscriber from "./redis-pub-sub-subscriber";

const startUp = async () => {
  RedisClient.initialize(process.env.REDIS_URL);
  await RedisClient.connect();

  RedisPubSubSubscriber.initialize(RedisClient.client());
  RedisPubSubSubscriber.subscribe("connection", async (data) => {
    await handleConnectionEvent(data);
  });
  RedisPubSubSubscriber.subscribe("reconnection", async (data) => {
    await handleReconnectionEvent(data);
  });
  RedisPubSubSubscriber.subscribe("navigation", async (data) => {
    await handleNavigationEvent(data);
  });
  RedisPubSubSubscriber.subscribe("visibilitychange", async (data) => {
    await handleVisibilityChangeEvent(data);
  });

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

startUp();
