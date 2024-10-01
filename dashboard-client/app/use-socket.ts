import { DashboardSubscribeEvent, Subjects } from "@analytiq/shared";
import { useEffect, useReducer, useRef } from "react";

const RECONNECT_INTERVAL = 1000;

export interface ISocketState {
  socket: WebSocket | null;
  open: boolean;
  error: boolean;
}

interface ISocketOpenAction {
  type: "open";
  socket: WebSocket;
}

interface ISocketErrorAction {
  type: "error";
}

interface ISocketCloseAction {
  type: "close";
}

type SocketAction = ISocketErrorAction | ISocketOpenAction | ISocketCloseAction;

function reducer(state: ISocketState, action: SocketAction): ISocketState {
  if (action.type === "open")
    return { socket: action.socket, open: true, error: false };
  if (action.type === "error")
    return { socket: state.socket, error: true, open: true };
  if (action.type === "close")
    return { socket: state.socket, error: state.error, open: false };
  return state;
}

export const useSocket = () => {
  const retriesRef = useRef(0);
  const [state, dispatch] = useReducer(reducer, {
    socket: null,
    open: false,
    error: false,
  });

  const connect = () => {
    console.log("Connecting socket.");
    const socket = new WebSocket("ws://analytiq.in/api/v1/dashboard-wss");
    socket.addEventListener("open", () => {
      retriesRef.current = 0;
      dispatch({ type: "open", socket: socket });
      const payload: DashboardSubscribeEvent["data"] = {
        subject: Subjects.DashboardSubscribe,
        data: {
          domain: "100xdevs.com",
        },
      };
      socket.send(JSON.stringify(payload));
    });
    socket.addEventListener("error", () => {
      dispatch({ type: "error" });
      socket.close();
    });
    socket.addEventListener("close", () => {
      dispatch({ type: "close" });
      reconnect();
    });
    socket.addEventListener("message", (ev) => {
      console.log({ ev });
    });
  };

  const reconnect = () => {
    setTimeout(() => {
      retriesRef.current = retriesRef.current + 1;
      console.log("Retrying connection");
      connect();
    }, RECONNECT_INTERVAL);
  };

  useEffect(() => {
    connect();
  }, []);

  return state;
};
