import { Dayjs } from "dayjs";

export type Option = {
  id: number;
  organizer: string;
  venue: string;
  date: Dayjs;
};
