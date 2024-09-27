import { DashboardSubscribeEvent } from "./dashboard/dashboard-subscribe";
import { DashboardUnsubscribeEvent } from "./dashboard/dashboard-unsubscribe";

type DashboardEvent = DashboardUnsubscribeEvent | DashboardSubscribeEvent;

export { DashboardEvent };
