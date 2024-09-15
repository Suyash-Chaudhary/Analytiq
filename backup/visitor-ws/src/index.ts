import { app, websocket } from "./app";
import RedisClient from "./redis-client";
import RedisPubSubPublisher from "./redis-pub-sub-publisher";

const startup = async () => {
  console.log(`Redis URL: ${process.env.REDIS_URL}`);
  RedisClient.initialize(process.env.REDIS_URL);
  await RedisClient.connect();

  RedisPubSubPublisher.initialize(RedisClient.client());
};

startup();

export default { port: 3000, fetch: app.fetch, websocket: websocket };
