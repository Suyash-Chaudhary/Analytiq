import DomainManager from "../../domain-manager";
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
  const domain = DomainManager.addVisit(
    payload.data.domain,
    payload.data.subdomain,
    {
      vid: payload.data.id,
      domain: payload.data.domain,
      subdomain: payload.data.subdomain,
      ipv4: payload.data.ip,
      startTime: payload.data.timeStamp,
      page: payload.data.page,
      query: "",
      sessions: [
        {
          page: payload.data.page,
          query: "",
          startTime: payload.data.timeStamp,
        },
      ],
    }
  );
  console.log({ domain });
};
