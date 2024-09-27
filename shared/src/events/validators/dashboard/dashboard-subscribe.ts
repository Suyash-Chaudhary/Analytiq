import { z } from "zod";
import { Subjects } from "../../subjects";

const DashboardSubscribeEventPayloadSchema = z.object({
  subject: z.literal(Subjects.DashboardSubscribe),
  data: z.object({
    domain: z.string(),
  }),
});

export { DashboardSubscribeEventPayloadSchema };
