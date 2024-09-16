import createEventBuffers from "../../utils/event-buffers";
import { MouseMoveEvent } from "../types/mouse-move";
import { Subjects } from "../types/subjects";

class MouseMoveEvents {
  private constructor() {
    [this.addEvent, this._pushEvents] = createEventBuffers<MouseMoveEvent>();
    this.pushEvents = async (socket: WebSocket) => {
      this._pushEvents(socket, Subjects.MouseMove);
    };
  }
  private static _instance: MouseMoveEvents;
  static instance() {
    if (!this._instance) this._instance = new MouseMoveEvents();
    return this._instance;
  }

  private _pushEvents: (socket: WebSocket, subject: Subjects) => Promise<void>;
  pushEvents: (socket: WebSocket) => Promise<void>;
  addEvent: (event: MouseMoveEvent["record"]) => void;
}

MouseMoveEvents.instance();

export default MouseMoveEvents;
