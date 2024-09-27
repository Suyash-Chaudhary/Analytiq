import { Subjects } from "../subjects";

export interface CustomEvent {
  subject: Subjects;
  data: any;
  record: any;
}
