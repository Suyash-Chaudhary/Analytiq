import { ClickEvent } from "../types/click";
import { Subjects } from "../types/subjects";
import BufferedEvents from "./buffered-events";

class ClickEvents extends BufferedEvents<ClickEvent> {
  subject: Subjects.MouseClick = Subjects.MouseClick;
  private constructor() {
    super();
  }

  private static _instance: ClickEvents;
  static instance() {
    if (!this._instance) this._instance = new ClickEvents();
    return this._instance;
  }
}

ClickEvents.instance();

export default ClickEvents;
