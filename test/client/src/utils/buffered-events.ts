import GlobalConfig from "../global-config";

const bufferedEvents = (): [
  (event: any) => void,
  (socket: WebSocket) => Promise<void>
] => {
  let q1: any = [];
  let q2: any = [];

  const addEvent = (event: any) => {
    if (q1.length >= GlobalConfig.MAX_BUFFER_SIZE) q1.shift();
    q1.push(event);
  };

  const sendEvents = async (socket: WebSocket) => {
    if (socket && socket.readyState) {
      [q1, q2] = [q2, q1];
      await socket.send(JSON.stringify({ events: q1 }));
      q1 = [];
    }
  };

  return [addEvent, sendEvents];
};

export default bufferedEvents;
