import { Subjects } from "../../subjects";
import { Visibility } from "../../visibility";

interface VisitorVisibilityChangeEventRecord {
  domain: string;
  subdomain: string;
  id: string;
  ip: string;
  visibility: Visibility;
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
