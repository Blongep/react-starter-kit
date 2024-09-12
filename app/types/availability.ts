import { Dayjs } from "dayjs";
import { Option } from "./option";

export type Availability = {
  id: number;
  artistShortName: string;
  region: string;
  startDate: Dayjs;
  endDate: Dayjs;
  options: Option[];
};
