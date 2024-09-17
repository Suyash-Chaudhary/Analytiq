import { MouseMoveEvent } from "../types/mouse-move";
import { Subjects } from "../types/subjects";
import BufferedEvents from "./buffered-events";

class MouseMoveEvents extends BufferedEvents<MouseMoveEvent> {
  subject: Subjects.MouseMove = Subjects.MouseMove;
  private constructor() {
    super();
  }

  private static _instance: MouseMoveEvents;
  static instance() {
    if (!this._instance) this._instance = new MouseMoveEvents();
    return this._instance;
  }
}

MouseMoveEvents.instance();

export default MouseMoveEvents;
