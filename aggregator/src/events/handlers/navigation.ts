import DomainManager from "../../state/domain-manager";
import {
  NavigationEvent,
  NavigationEventPayloadSchema,
} from "../types/navigation";

export const handleNavigationEvent = async (data: any) => {
  const status = NavigationEventPayloadSchema.safeParse(data);
  if (!status.success) {
    console.log(`Invalid NavigationEventPayload`, status.error);
    return;
  }

  const payload: NavigationEvent["payload"] = status.data;

  let visit;
  payload.data.records.forEach((record) => {
    visit = DomainManager.updateUrl(
      record.domain,
      record.subdomain,
      record.id,
      record.timeStamp,
      record.page
    );
  });
  console.log({ visit });
};
