import { Subjects } from "../types/subjects";
import { VisibilityChangeEvent } from "../types/visibility-change";
import BufferedEvents from "./buffered-events";

class VisibilityChangeEvents extends BufferedEvents<VisibilityChangeEvent> {
  subject: Subjects.VisibilityChange = Subjects.VisibilityChange;
  private constructor() {
    super();
  }

  private static _instance: VisibilityChangeEvents;
  static instance() {
    if (!this._instance) this._instance = new VisibilityChangeEvents();
    return this._instance;
  }
}

VisibilityChangeEvents.instance();

export default VisibilityChangeEvents;
