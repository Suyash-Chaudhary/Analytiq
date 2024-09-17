import { Subjects } from "./enums";

export interface CustomEvent {
  subject: Subjects;
  record: any;
  payload: any;
}
