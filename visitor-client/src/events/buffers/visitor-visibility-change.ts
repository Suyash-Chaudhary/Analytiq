import {
  EventBuffer,
  Subjects,
  VisitorVisibilityChangeEvent,
} from "@analytiq/shared";
import GlobalConfig from "../../state/global-config";

class VisitorVisibilityChangeEvents extends EventBuffer<VisitorVisibilityChangeEvent> {
  MAX_BUFFER_SIZE: number = GlobalConfig.MAX_BUFFER_SIZE;
  subject: Subjects.VisitorVisibilityChange = Subjects.VisitorVisibilityChange;
  private constructor() {
    super();
  }

  private static _instance: VisitorVisibilityChangeEvents;
  static instance() {
    if (!this._instance) this._instance = new VisitorVisibilityChangeEvents();
    return this._instance;
  }
}

VisitorVisibilityChangeEvents.instance();

export default VisitorVisibilityChangeEvents;
