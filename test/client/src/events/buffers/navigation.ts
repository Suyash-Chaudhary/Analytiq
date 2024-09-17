import { NavigationEvent } from "../types/navigation";
import { Subjects } from "../types/subjects";
import BufferedEvents from "./buffered-events";

class NavigationEvents extends BufferedEvents<NavigationEvent> {
  subject: Subjects.Navigation = Subjects.Navigation;
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
