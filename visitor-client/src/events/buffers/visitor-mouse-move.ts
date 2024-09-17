import { EventBuffer, Subjects, VisitorMouseMoveEvent } from "@analytiq/shared";
import GlobalConfig from "../../state/global-config";

class VisitorMouseMoveEvents extends EventBuffer<VisitorMouseMoveEvent> {
  MAX_BUFFER_SIZE = GlobalConfig.MAX_BUFFER_SIZE;
  subject: Subjects.VisitorMouseMove = Subjects.VisitorMouseMove;
  private constructor() {
    super();
  }

  private static _instance: VisitorMouseMoveEvents;
  static instance() {
    if (!this._instance) this._instance = new VisitorMouseMoveEvents();
    return this._instance;
  }
}

VisitorMouseMoveEvents.instance();

export default VisitorMouseMoveEvents;
