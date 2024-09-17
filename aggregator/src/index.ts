import app from "./app";
import { handleConnectionEvent } from "./events/handlers/connection";
import { handleNavigationEvent } from "./events/handlers/navigation";
import { handleReconnectionEvent } from "./events/handlers/reconnection";
import { handleVisibilityChangeEvent } from "./events/handlers/visibility-change";
import RedisClient from "./events/clients/redis-client";
import RedisPubSubSubscriber from "./events/clients/redis-pub-sub-subscriber";
import { Subjects } from "./events/types/enums";

const startUp = async () => {
  RedisClient.initialize(process.env.REDIS_URL);
  await RedisClient.connect();

  RedisPubSubSubscriber.initialize(RedisClient.client());
  RedisPubSubSubscriber.subscribe(Subjects.Connection, async (data) => {
    await handleConnectionEvent(data);
  });
  RedisPubSubSubscriber.subscribe(Subjects.Reconnection, async (data) => {
    await handleReconnectionEvent(data);
  });
  RedisPubSubSubscriber.subscribe(Subjects.Navigation, async (data) => {
    await handleNavigationEvent(data);
  });
  RedisPubSubSubscriber.subscribe(Subjects.VisibilityChange, async (data) => {
    await handleVisibilityChangeEvent(data);
  });

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

startUp();
