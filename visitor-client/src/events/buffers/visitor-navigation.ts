import {
  EventBuffer,
  Subjects,
  VisitorNavigationEvent,
} from "@analytiq/shared";
import GlobalConfig from "../../state/global-config";

class VisitorNavigationEvents extends EventBuffer<VisitorNavigationEvent> {
  MAX_BUFFER_SIZE = GlobalConfig.MAX_BUFFER_SIZE;
  subject: Subjects.VisitorNavigation = Subjects.VisitorNavigation;
  private constructor() {
    super();
  }

  private static _instance: VisitorNavigationEvents;
  static instance() {
    if (!this._instance) this._instance = new VisitorNavigationEvents();
    return this._instance;
  }
}

VisitorNavigationEvents.instance();

export default VisitorNavigationEvents;
