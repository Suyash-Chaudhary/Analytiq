import { Subjects } from "./subjects";

export interface CustomEvent {
  subject: Subjects;
  record: any;
  payload: any;
}
