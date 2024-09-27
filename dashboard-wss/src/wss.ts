import { WebSocketServer } from "ws";
import { WebsocketManager } from "./state/websocket-manager";
import { DashboardEventSchema, Subjects } from "@analytiq/shared";

const server = new WebSocketServer({ noServer: true });

server.on("connection", (socket, req) => {
  console.log("Server connection established");

  socket.on("message", (data) => {
    const json = JSON.parse(data.toString());
    const result = DashboardEventSchema.safeParse(json);
    if (!result.data)
      throw new Error(
        `Invalid message format for DashboardEvent. Message: ${json}`
      );

    if (result.data.subject === Subjects.DashboardSubscribe)
      WebsocketManager.resgisterSocketToDomain(socket, result.data.data.domain);

    if (result.data.subject === Subjects.DashboardUnsubscribe)
      WebsocketManager.unregisterSocketFromDomain(
        socket,
        result.data.data.domain
      );
  });

  socket.on("error", (err) => {
    console.log("Socker error occured");
    console.log({ err });
  });

  socket.on("close", (code, reason) => {
    console.log("Socket connection closed");
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
