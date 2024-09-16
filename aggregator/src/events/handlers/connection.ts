import {
  ConnectionEvent,
  ConnectionEventPayloadSchema,
} from "../types/connection";

export const handleConnectionEvent = async (data: any) => {
  console.log({ data });
  const status = ConnectionEventPayloadSchema.safeParse(data);
  if (!status.success) {
    console.log(`Invalid ConnectionEventPayload`, status.error);
    return;
  }

  const payload: ConnectionEvent["payload"] = status.data;
  console.log("Handling ConnectionEvent");
};
