import { EventBuffer, Subjects, VisitorScrollEvent } from "@analytiq/shared";
import GlobalConfig from "../../state/global-config";

class ScrollEvents extends EventBuffer<VisitorScrollEvent> {
  MAX_BUFFER_SIZE: number = GlobalConfig.MAX_BUFFER_SIZE;
  subject: Subjects.VisitorScroll = Subjects.VisitorScroll;
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
