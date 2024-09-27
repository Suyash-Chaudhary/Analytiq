import { z } from "zod";
import { Subjects } from "../../subjects";

const DashboardUnsubscribeEventPayloadSchema = z.object({
  subject: z.literal(Subjects.DashboardUnsubscribe),
  data: z.object({
    domain: z.string(),
  }),
});

export { DashboardUnsubscribeEventPayloadSchema };
