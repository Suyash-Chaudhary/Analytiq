import { Subjects } from "../subjects";

interface VisitorVisibilityChangeEventRecord {
  domain: string;
  subdomain: string;
  id: string;
  ip: string;
  visibility: "hidden" | "visible";
  timeStamp: number;
}

interface VisitorVisibilityChangeEventPayload {
  subject: Subjects.VisitorVisibilityChange;
  data: { records: VisitorVisibilityChangeEventRecord[] };
}

export interface VisitorVisibilityChangeEvent {
  subject: Subjects.VisitorVisibilityChange;
  record: VisitorVisibilityChangeEventRecord;
  data: VisitorVisibilityChangeEventPayload;
}
