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
  console.log("Handling NavigationEvent");
};
