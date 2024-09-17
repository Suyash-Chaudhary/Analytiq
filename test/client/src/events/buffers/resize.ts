import createEventBuffers from "../../utils/event-buffers";
import { ResizeEvent } from "../types/resize";
import { Subjects } from "../types/subjects";

class ResizeEvents {
  private constructor() {
    [this.addEvent, this._pushEvents] = createEventBuffers<ResizeEvent>();
    this.pushEvents = async (socket: WebSocket) => {
      await this._pushEvents(socket, Subjects.Resize);
    };
  }
  private static _instance: ResizeEvents;
  static instance() {
    if (!this._instance) this._instance = new ResizeEvents();
    return this._instance;
  }

  private _pushEvents: (socket: WebSocket, subject: Subjects) => Promise<void>;
  pushEvents: (socket: WebSocket) => Promise<void>;
  addEvent: (event: ResizeEvent["record"]) => void;
}

ResizeEvents.instance();

export default ResizeEvents;
