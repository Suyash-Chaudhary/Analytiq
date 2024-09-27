import app from "./app";
import wss from "./wss";
import { RedisClient } from "@analytiq/shared";

const startUp = async () => {
  RedisClient.initialize(process.env.REDIS_URL);
  await RedisClient.connect();

  const server = app.listen(3000, () => {
    console.log("Listening on port 3000");
  });

  server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (socket) => {
      wss.emit("connection", socket, request);
    });
  });
};

startUp();
