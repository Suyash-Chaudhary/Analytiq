import createEventBuffers from "../../utils/event-buffers";
import { ClickEvent } from "../types/click";
import { Subjects } from "../types/subjects";

class ClickEvents {
  private constructor() {
    [this.addEvent, this._pushEvents] = createEventBuffers<ClickEvent>();
    this.pushEvents = async (socket: WebSocket) => {
      await this._pushEvents(socket, Subjects.MouseClick);
    };
  }
  private static _instance: ClickEvents;
  static instance() {
    if (!this._instance) this._instance = new ClickEvents();
    return this._instance;
  }

  private _pushEvents: (socket: WebSocket, subject: Subjects) => Promise<void>;
  pushEvents: (socket: WebSocket) => Promise<void>;
  addEvent: (event: ClickEvent["record"]) => void;
}

ClickEvents.instance();

export default ClickEvents;
