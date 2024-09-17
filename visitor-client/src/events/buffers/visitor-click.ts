import {
  EventBuffer,
  Subjects,
  VisitorMouseClickEvent,
} from "@analytiq/shared";
import GlobalConfig from "../../state/global-config";

class VisitorClickEvents extends EventBuffer<VisitorMouseClickEvent> {
  MAX_BUFFER_SIZE = GlobalConfig.MAX_BUFFER_SIZE;
  subject: Subjects.VisitorMouseClick = Subjects.VisitorMouseClick;
  private constructor() {
    super();
  }

  private static _instance: VisitorClickEvents;
  static instance() {
    if (!this._instance) this._instance = new VisitorClickEvents();
    return this._instance;
  }
}

VisitorClickEvents.instance();

export default VisitorClickEvents;
