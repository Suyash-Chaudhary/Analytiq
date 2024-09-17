import DomainManager from "../../state/domain-manager";
import {
  ConnectionEvent,
  ConnectionEventPayloadSchema,
} from "../types/connection";

export const handleConnectionEvent = async (data: any) => {
  const status = ConnectionEventPayloadSchema.safeParse(data);
  if (!status.success) {
    console.log(`Invalid ConnectionEventPayload`, status.error);
    return;
  }

  const payload: ConnectionEvent["payload"] = status.data;
  const visit = DomainManager.addVisit(
    payload.data.domain,
    payload.data.subdomain,
    payload.data.ip,
    payload.data.id,
    payload.data.timeStamp,
    payload.data.page
  );
  console.log({ visit });
};
