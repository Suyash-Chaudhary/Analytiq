import {
  EventBuffer,
  Subjects,
  VisitorMouseClickEvent,
} from "@analytiq/shared";
import GlobalConfig from "../../state/global-config";

class ClickEvents extends EventBuffer<VisitorMouseClickEvent> {
  MAX_BUFFER_SIZE = GlobalConfig.MAX_BUFFER_SIZE;
  subject: Subjects.VisitorMouseClick = Subjects.VisitorMouseClick;
  private constructor() {
    super();
  }

  private static _instance: ClickEvents;
  static instance() {
    if (!this._instance) this._instance = new ClickEvents();
    return this._instance;
  }
}

ClickEvents.instance();

export default ClickEvents;
