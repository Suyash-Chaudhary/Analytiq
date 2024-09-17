import createEventBuffers from "../../utils/event-buffers";
import { Subjects } from "../types/subjects";
import { VisibilityChangeEvent } from "../types/visibility-change";

class VisibilityChangeEvents {
  private constructor() {
    [this.addEvent, this._pushEvents] =
      createEventBuffers<VisibilityChangeEvent>();
    this.pushEvents = async (socket: WebSocket) => {
      await this._pushEvents(socket, Subjects.VisibilityChange);
    };
  }
  private static _instance: VisibilityChangeEvents;
  static instance() {
    if (!this._instance) this._instance = new VisibilityChangeEvents();
    return this._instance;
  }

  private _pushEvents: (socket: WebSocket, subject: Subjects) => Promise<void>;
  pushEvents: (socket: WebSocket) => Promise<void>;
  addEvent: (event: VisibilityChangeEvent["record"]) => void;
}

VisibilityChangeEvents.instance();

export default VisibilityChangeEvents;
