import { ResizeEvent } from "../types/resize";
import { Subjects } from "../types/subjects";
import BufferedEvents from "./buffered-events";

class ResizeEvents extends BufferedEvents<ResizeEvent> {
  subject: Subjects.Resize = Subjects.Resize;
  private constructor() {
    super();
  }

  private static _instance: ResizeEvents;
  static instance() {
    if (!this._instance) this._instance = new ResizeEvents();
    return this._instance;
  }
}

ResizeEvents.instance();

export default ResizeEvents;
