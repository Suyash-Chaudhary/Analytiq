import { createBunWebSocket } from "hono/bun";
import type { ServerWebSocket } from "bun";
import { Hono } from "hono";
import RedisPubSubPublisher from "./redis-pub-sub-publisher";

const app = new Hono();
const { upgradeWebSocket, websocket } = createBunWebSocket<ServerWebSocket>();

app.get(
  "/api/v1/visitor-ws",
  upgradeWebSocket((c) => {
    return {
      onMessage(event, ws) {
        // Push to Redis Pub-Sub
        RedisPubSubPublisher.publish("domain", event.data.toString());
        console.log(JSON.parse(event.data.toString()));
      },
      onOpen: (event, ws) => {
        // Push to Redis Pub-Sub
        console.log("Connection opened");
      },
      onClose: () => {
        console.log("Connection closed");
      },
    };
  })
);

app.get("/api/v1/visitor-ws", async (c) => {
  return c.json({ success: true });
});

export { app, websocket };
