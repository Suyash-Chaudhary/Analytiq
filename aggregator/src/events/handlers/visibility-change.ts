import {
  VisibilityChangeEvent,
  VisibilityChangeEventPayloadSchema,
} from "../types/visibility-change";

export const handleVisibilityChangeEvent = async (data: any) => {
  const status = VisibilityChangeEventPayloadSchema.safeParse(data);
  if (!status.success) {
    console.log(`Invalid VisibilityChangeEventPayload`, status.error);
    return;
  }

  const payload: VisibilityChangeEvent["payload"] = status.data;
  console.log("Handling VisibilityChangeEvent");
};
