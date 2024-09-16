import createEventBuffers from "../../utils/event-buffers";
import { NavigationEvent } from "../types/navigation";
import { Subjects } from "../types/subjects";

class NavigationEvents {
  private constructor() {
    [this.addEvent, this._pushEvents] = createEventBuffers<NavigationEvent>();
    this.pushEvents = async (socket: WebSocket) => {
      this._pushEvents(socket, Subjects.Navigation);
    };
  }
  private static _instance: NavigationEvents;
  static instance() {
    if (!this._instance) this._instance = new NavigationEvents();
    return this._instance;
  }

  private _pushEvents: (socket: WebSocket, subject: Subjects) => Promise<void>;
  pushEvents: (socket: WebSocket) => Promise<void>;
  addEvent: (event: NavigationEvent["record"]) => void;
}

NavigationEvents.instance();

export default NavigationEvents;
