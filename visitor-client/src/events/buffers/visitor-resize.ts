import { EventBuffer, Subjects, VisitorResizeEvent } from "@analytiq/shared";
import GlobalConfig from "../../state/global-config";

class VisitorResizeEvents extends EventBuffer<VisitorResizeEvent> {
  MAX_BUFFER_SIZE: number = GlobalConfig.MAX_BUFFER_SIZE;
  subject: Subjects.VisitorResize = Subjects.VisitorResize;
  private constructor() {
    super();
  }

  private static _instance: VisitorResizeEvents;
  static instance() {
    if (!this._instance) this._instance = new VisitorResizeEvents();
    return this._instance;
  }
}

VisitorResizeEvents.instance();

export default VisitorResizeEvents;
