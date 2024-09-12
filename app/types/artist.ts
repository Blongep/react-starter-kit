import { Availability } from "./availability";
import { Concert } from "./concert";

export type Artist = {
  shortName: string;
  longName: string;
  id: number;
  description: string;
  image: string;
  availabilities: Availability[];
  concerts: Concert[];
};
