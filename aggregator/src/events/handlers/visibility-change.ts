import DomainManager from "../../state/domain-manager";
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
  let visit;
  payload.data.records.forEach((record) => {
    visit = DomainManager.updateVisibility(
      record.domain,
      record.subdomain,
      record.id,
      record.timeStamp,
      record.visibility
    );
  });
  console.log({ visit });
};
