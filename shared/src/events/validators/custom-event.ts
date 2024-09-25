import { z } from "zod";

const CustomEventSchema = z.object({
  subject: z.string(),
  data: z.any(),
});

export { CustomEventSchema };
