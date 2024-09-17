import { EventBuffer, Subjects, VisitorMouseMoveEvent } from "@analytiq/shared";
import GlobalConfig from "../../state/global-config";

class MouseMoveEvents extends EventBuffer<VisitorMouseMoveEvent> {
  MAX_BUFFER_SIZE = GlobalConfig.MAX_BUFFER_SIZE;
  subject: Subjects.VisitorMouseMove = Subjects.VisitorMouseMove;
  private constructor() {
    super();
  }

  private static _instance: MouseMoveEvents;
  static instance() {
    if (!this._instance) this._instance = new MouseMoveEvents();
    return this._instance;
  }
}

MouseMoveEvents.instance();

export default MouseMoveEvents;
