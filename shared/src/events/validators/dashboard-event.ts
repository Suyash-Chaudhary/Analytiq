import { z } from "zod";
import { DashboardSubscribeEventPayloadSchema } from "./dashboard/dashboard-subscribe";
import { DashboardUnsubscribeEventPayloadSchema } from "./dashboard/dashboard-unsubscribe";

const DashboardEventSchema = z.union([
  DashboardSubscribeEventPayloadSchema,
  DashboardUnsubscribeEventPayloadSchema,
]);

export { DashboardEventSchema };
