import {
  EventBuffer,
  Subjects,
  VisitorNavigationEvent,
} from "@analytiq/shared";
import GlobalConfig from "../../state/global-config";

class NavigationEvents extends EventBuffer<VisitorNavigationEvent> {
  MAX_BUFFER_SIZE = GlobalConfig.MAX_BUFFER_SIZE;
  subject: Subjects.VisitorNavigation = Subjects.VisitorNavigation;
  private constructor() {
    super();
  }

  private static _instance: NavigationEvents;
  static instance() {
    if (!this._instance) this._instance = new NavigationEvents();
    return this._instance;
  }
}

NavigationEvents.instance();

export default NavigationEvents;
