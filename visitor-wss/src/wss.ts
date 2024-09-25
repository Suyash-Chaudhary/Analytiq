import { WebSocketServer } from "ws";
import RedisPubSubPublisher from "./redis-pub-sub-publisher";

const server = new WebSocketServer({ noServer: true });

server.on("connection", (socket, req) => {
  console.log("Server connection established");

  socket.on("message", (data, isBinary) => {
    const payload = JSON.parse(data.toString());

    RedisPubSubPublisher.publish(payload.subject, data.toString());
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
