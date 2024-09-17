import { EventBuffer, Subjects, VisitorResizeEvent } from "@analytiq/shared";
import GlobalConfig from "../../state/global-config";

class ResizeEvents extends EventBuffer<VisitorResizeEvent> {
  MAX_BUFFER_SIZE: number = GlobalConfig.MAX_BUFFER_SIZE;
  subject: Subjects.VisitorResize = Subjects.VisitorResize;
  private constructor() {
    super();
  }

  private static _instance: ResizeEvents;
  static instance() {
    if (!this._instance) this._instance = new ResizeEvents();
    return this._instance;
  }
}

ResizeEvents.instance();

export default ResizeEvents;
