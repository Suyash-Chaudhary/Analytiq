import { app } from "./app";
import RedisClient from "./redis-client";
import RedisPubSubSubscriber from "./redis-pub-sub-subscriber";

const startup = async () => {
  console.log(`Redis URL: ${process.env.REDIS_URL}`);
  RedisClient.initialize(process.env.REDIS_URL);
  await RedisClient.connect();

  RedisPubSubSubscriber.initialize(RedisClient.client());
  RedisPubSubSubscriber.subscribe("domain", (data) => {
    console.log({ data });
  });
};

startup();

export default { port: 3000, fetch: app.fetch };
