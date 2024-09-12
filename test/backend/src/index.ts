import { Hono } from "hono";
import { createBunWebSocket } from "hono/bun";
import type { ServerWebSocket } from "bun";

const app = new Hono();
const { upgradeWebSocket, websocket } = createBunWebSocket<ServerWebSocket>();

app.get(
  "/",
  upgradeWebSocket((c) => {
    return {
      onMessage(event, ws) {
        console.log(JSON.parse(event.data.toString()));
      },
      onOpen: (event, ws) => {
        console.log("Connection opened");
      },
      onClose: () => {
        console.log("Connection closed");
      },
    };
  }),
);

Bun.serve({
  fetch: app.fetch,
  websocket,
});

export default app;
