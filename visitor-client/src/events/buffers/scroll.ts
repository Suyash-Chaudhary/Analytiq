import { ScrollEvent } from "../types/scroll";
import { Subjects } from "../types/subjects";
import BufferedEvents from "./buffered-events";

class ScrollEvents extends BufferedEvents<ScrollEvent> {
  subject: Subjects.Scroll = Subjects.Scroll;
  private constructor() {
    super();
  }

  private static _instance: ScrollEvents;
  static instance() {
    if (!this._instance) this._instance = new ScrollEvents();
    return this._instance;
  }
}

ScrollEvents.instance();

export default ScrollEvents;
