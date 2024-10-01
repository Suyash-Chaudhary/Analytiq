import { WebSocketServer, WebSocket } from "ws";
import { RedisClient, Subjects, VisitorEventSchema } from "@analytiq/shared";
import { WebsocketManager } from "./state/websocket-manager";
import { VisitorEventPublisher } from "./events/publishers/visitor";

const server = new WebSocketServer({ noServer: true });

server.on("connection", (socket, req) => {
  console.log("Server connection established");

  socket.on("message", (data, isBinary) => {
    const vevResult = VisitorEventSchema.safeParse(JSON.parse(data.toString()));
    if (!vevResult.success) throw new Error("Invalid message format");

    if (vevResult.data.subject === Subjects.VisitorConnection) {
      WebsocketManager.add(socket, {
        domain: vevResult.data.data.domain,
        subdomain: vevResult.data.data.subdomain,
        ip: vevResult.data.data.ip,
        id: vevResult.data.data.id,
        timeStamp: vevResult.data.data.timeStamp,
        startTimeStamp: vevResult.data.data.startTimeStamp,
      });
    }

    const payload = vevResult.data;
    VisitorEventPublisher.instance().publish(RedisClient.publisher(), payload);
  });

  socket.on("error", (err) => {
    console.log("Socker error occured");
    console.log({ err });
  });

  socket.on("close", (code, reason) => {
    console.log("Socket connection closed");
    const data = WebsocketManager.remove(socket);

    // Filter for actual termination.
    // Going away.
    if (code === 1001)
      VisitorEventPublisher.instance().publish(RedisClient.publisher(), {
        subject: Subjects.VisitorDisconnection,
        data,
      });
    // Network Failure

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
