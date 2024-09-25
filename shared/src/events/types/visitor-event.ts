import { VisitorMouseClickEvent } from "./visitor/visitor-click";
import { VisitorConnectionEvent } from "./visitor/visitor-connection";
import { VisitorDisconnectionEvent } from "./visitor/visitor-disconnection";
import { VisitorMouseMoveEvent } from "./visitor/visitor-mouse-move";
import { VisitorNavigationEvent } from "./visitor/visitor-navigation";
import { VisitorReconnectionEvent } from "./visitor/visitor-reconnection";
import { VisitorResizeEvent } from "./visitor/visitor-resize";
import { VisitorScrollEvent } from "./visitor/visitor-scroll";
import { VisitorVisibilityChangeEvent } from "./visitor/visitor-visibility-change";

type VisitorEvent =
  | VisitorConnectionEvent
  | VisitorMouseClickEvent
  | VisitorMouseMoveEvent
  | VisitorNavigationEvent
  | VisitorResizeEvent
  | VisitorScrollEvent
  | VisitorReconnectionEvent
  | VisitorVisibilityChangeEvent
  | VisitorDisconnectionEvent;

export { VisitorEvent };
