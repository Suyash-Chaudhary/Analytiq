import { Hono } from "hono";
import DomainManager from "./domain-manager";

const app = new Hono();
DomainManager.initialize();

app.get("/api/v1/aggregator", (c) => {
  return c.text("Hello Hono!");
});

export { app };
