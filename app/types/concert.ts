import { Dayjs } from "dayjs";

export type Concert = {
  id: number;
  organizer: string;
  venue: string;
  date: Dayjs;
};
