import { EventBuffer, Subjects, VisitorScrollEvent } from "@analytiq/shared";
import GlobalConfig from "../../state/global-config";

class VisitorScrollEvents extends EventBuffer<VisitorScrollEvent> {
  MAX_BUFFER_SIZE: number = GlobalConfig.MAX_BUFFER_SIZE;
  subject: Subjects.VisitorScroll = Subjects.VisitorScroll;
  private constructor() {
    super();
  }

  private static _instance: VisitorScrollEvents;
  static instance() {
    if (!this._instance) this._instance = new VisitorScrollEvents();
    return this._instance;
  }
}

VisitorScrollEvents.instance();

export default VisitorScrollEvents;
