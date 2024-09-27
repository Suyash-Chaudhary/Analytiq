import { WebSocketServer, WebSocket } from "ws";
import {
  RedisClient,
  Subjects,
  VisitorConnectionEventPayloadSchema,
  VisitorEventSchema,
} from "@analytiq/shared";
import { WebsocketManager } from "./state/websocket-manager";
import { VisitorEventPublisher } from "./events/publishers/visitor";

const server = new WebSocketServer({ noServer: true });

server.on("connection", (socket, req) => {
  console.log("Server connection established");

  socket.on("message", (data, isBinary) => {
    const cevResult = VisitorEventSchema.safeParse(JSON.parse(data.toString()));
    if (!cevResult.success) throw new Error("Invalid message format");

    if (cevResult.data.subject === Subjects.VisitorConnection) {
      const vcevResult = VisitorConnectionEventPayloadSchema.safeParse(
        cevResult.data
      );
      if (!vcevResult.success)
        throw new Error("Invalid visitor connection message format");

      WebsocketManager.add(socket, {
        domain: vcevResult.data.data.domain,
        subdomain: vcevResult.data.data.subdomain,
        ip: vcevResult.data.data.ip,
        id: vcevResult.data.data.id,
        timeStamp: vcevResult.data.data.timeStamp,
      });
    }

    const payload = cevResult.data;
    VisitorEventPublisher.instance().publish(RedisClient.client(), payload);
  });

  socket.on("error", (err) => {
    console.log("Socker error occured");
    console.log({ err });
  });

  socket.on("close", (code, reason) => {
    console.log("Socket connection closed");

    // Filter for actualy termination.
    const data = WebsocketManager.remove(socket);
    VisitorEventPublisher.instance().publish(RedisClient.client(), {
      subject: Subjects.VisitorDisconnection,
      data,
    });

    console.log({ code, reason: reason.toString() });
  });

  socket.on("open", () => {
    console.log("Socket connection opened");
  });
});

server.on("close", () => {
  console.log("Server connection closed");
});

server.on("error", () => {
  console.log("Server error occured");
});

server.on("listening", () => {
  console.log("Server listening");
});

server.on("headers", (socket, req) => {
  console.log("Server headers");
});

export default server;
