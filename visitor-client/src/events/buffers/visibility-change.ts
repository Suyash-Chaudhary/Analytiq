import {
  EventBuffer,
  Subjects,
  VisitorVisibilityChangeEvent,
} from "@analytiq/shared";
import GlobalConfig from "../../state/global-config";

class VisibilityChangeEvents extends EventBuffer<VisitorVisibilityChangeEvent> {
  MAX_BUFFER_SIZE: number = GlobalConfig.MAX_BUFFER_SIZE;
  subject: Subjects.VisitorVisibilityChange = Subjects.VisitorVisibilityChange;
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
