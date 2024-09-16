import {
  ReconnectionEvent,
  ReconnectionEventPayloadSchema,
} from "../types/reconnection";

export const handleReconnectionEvent = async (data: any) => {
  const status = ReconnectionEventPayloadSchema.safeParse(data);
  if (!status.success) {
    console.log(`Invalid ReconnectionEventPayload`, status.error);
    return;
  }

  const payload: ReconnectionEvent["payload"] = status.data;
  console.log("Handling ConnectionEvent");
};
