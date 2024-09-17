import createEventBuffers from "../../utils/event-buffers";
import { ScrollEvent } from "../types/scroll";
import { Subjects } from "../types/subjects";

class ScrollEvents {
  private constructor() {
    [this.addEvent, this._pushEvents] = createEventBuffers<ScrollEvent>();
    this.pushEvents = async (socket: WebSocket) => {
      await this._pushEvents(socket, Subjects.Scroll);
    };
  }
  private static _instance: ScrollEvents;
  static instance() {
    if (!this._instance) this._instance = new ScrollEvents();
    return this._instance;
  }

  private _pushEvents: (socket: WebSocket, subject: Subjects) => Promise<void>;
  pushEvents: (socket: WebSocket) => Promise<void>;
  addEvent: (event: ScrollEvent["record"]) => void;
}

ScrollEvents.instance();

export default ScrollEvents;
