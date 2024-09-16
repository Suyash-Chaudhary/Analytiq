import app from "./app";
import RedisClient from "./redis-client";
import RedisPubSubSubscriber from "./redis-pub-sub-subscriber";

const startUp = async () => {
  RedisClient.initialize(process.env.REDIS_URL);
  await RedisClient.connect();

  RedisPubSubSubscriber.initialize(RedisClient.client());
  RedisPubSubSubscriber.subscribe(
    ["connection", "reconnection", "navigation", "visibilitychange"],
    (data) => {
      console.log({ data });
    }
  );

  app.listen(3000, () => {
    console.log("Listening on port 3000");
  });
};

startUp();
