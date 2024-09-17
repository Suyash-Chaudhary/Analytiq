import createEventBuffers from "../../utils/event-buffers";
import { CustomEvent } from "../types/custom";

abstract class BufferedEvents<EventType extends CustomEvent> {
  abstract get subject(): EventType["subject"];

  protected constructor() {
    [this.addEvent, this._pushEvents] = createEventBuffers<EventType>();
    this.pushEvents = async (socket: WebSocket) => {
      await this._pushEvents(socket, this.subject);
    };
  }

  private _pushEvents: (
    socket: WebSocket,
    subject: EventType["subject"]
  ) => Promise<void>;
  pushEvents: (socket: WebSocket) => Promise<void>;
  addEvent: (event: EventType["record"]) => void;
}

export default BufferedEvents;
