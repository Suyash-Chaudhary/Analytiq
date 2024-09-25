import { z } from "zod";
import { VisitorMouseClickEventPayloadSchema } from "./visitor/visitor-click";
import { VisitorConnectionEventPayloadSchema } from "./visitor/visitor-connection";
import { VisitorMouseMoveEventPayloadSchema } from "./visitor/visitor-mouse-move";
import { VisitorNavigationEventPayloadSchema } from "./visitor/visitor-navigation";
import { VisitorReconnectionEventPayloadSchema } from "./visitor/visitor-reconnection";
import { VisitorResizeEventPayloadSchema } from "./visitor/visitor-resize";
import { VisitorScrollEventPayloadSchema } from "./visitor/visitor-scroll";
import { VisitorVisibilityChangeEventPayloadSchema } from "./visitor/visitor-visibility-change";

const VisitorEventSchema = z.union([
  VisitorConnectionEventPayloadSchema,
  VisitorMouseClickEventPayloadSchema,
  VisitorMouseMoveEventPayloadSchema,
  VisitorNavigationEventPayloadSchema,
  VisitorReconnectionEventPayloadSchema,
  VisitorResizeEventPayloadSchema,
  VisitorScrollEventPayloadSchema,
  VisitorVisibilityChangeEventPayloadSchema,
]);

export { VisitorEventSchema };
