import DomainManager from "../../state/domain-manager";
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
  const domain = DomainManager.updateUrl(
    payload.data.domain,
    payload.data.subdomain,
    payload.data.id,
    payload.data.timeStamp,
    payload.data.page
  );
  console.log({ domain });
};
