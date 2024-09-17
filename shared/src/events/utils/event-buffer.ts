import { CustomEvent } from "../../custom-event";

abstract class EventBuffer<EventType extends CustomEvent> {
  abstract get MAX_BUFFER_SIZE(): number;
  protected constructor() {}

  private q1: EventType["record"][] = [];
  private q2: EventType["record"][] = [];

  addEvent(record: EventType["record"]) {
    if (this.q1.length >= this.MAX_BUFFER_SIZE) this.q1.shift();
    this.q1.push(record);
  }

  sendEvents(socket: WebSocket, subject: EventType["subject"]) {
    if (socket && socket.readyState && this.q1.length > 0) {
      [this.q1, this.q2] = [this.q2, this.q1];
      socket.send(JSON.stringify({ subject, data: { records: this.q2 } }));
      this.q2 = [];
    }
  }
}

export default EventBuffer;
