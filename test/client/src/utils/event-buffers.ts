import { Subjects } from "../events/types/subjects";
import GlobalConfig from "../global-config";
import { CustomEvent } from "../events/types/custom";

const createEventBuffers = <EventType extends CustomEvent>(): [
  (record: EventType["record"]) => void,
  (socket: WebSocket, subject: Subjects) => Promise<void>
] => {
  let q1: EventType["record"] = [];
  let q2: EventType["record"] = [];

  const addEvent = (record: EventType["record"]) => {
    if (q1.length >= GlobalConfig.MAX_BUFFER_SIZE) q1.shift();
    q1.push(record);
  };

  const sendEvents = async (socket: WebSocket, subject: Subjects) => {
    if (socket && socket.readyState && q1.length > 0) {
      [q1, q2] = [q2, q1];
      await socket.send(JSON.stringify({ subject, data: { records: q2 } }));
      q2 = [];
    }
  };

  return [addEvent, sendEvents];
};

export default createEventBuffers;
