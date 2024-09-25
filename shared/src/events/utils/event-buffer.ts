import { CustomEvent } from "../types/custom-event";

abstract class EventBuffer<EventType extends CustomEvent> {
  abstract MAX_BUFFER_SIZE: number;
  abstract subject: EventType["subject"];

  protected constructor() {}

  private q1: EventType["record"][] = [];
  private q2: EventType["record"][] = [];

  addEvent(record: EventType["record"]) {
    if (this.q1.length >= this.MAX_BUFFER_SIZE) this.q1.shift();
    this.q1.push(record);
  }

  sendEvents(socket: WebSocket) {
    if (socket && socket.readyState && this.q1.length > 0) {
      [this.q1, this.q2] = [this.q2, this.q1];
      socket.send(
        JSON.stringify({ subject: this.subject, data: { records: this.q2 } })
      );
      this.q2 = [];
    }
  }
}

export { EventBuffer };
