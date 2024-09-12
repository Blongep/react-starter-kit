import { Table, Typography } from "@mui/joy";
import dayjs from "dayjs";
import { Concert } from "../types/concert";

export function ConcertGrid(concertsProps: ConcertGridProps): JSX.Element {
  return (
    <Table aria-label="basic table">
      <thead>
        <tr>
          <th style={{ width: "33%" }}>Organisateur</th>
          <th style={{ width: "33%" }}>Lieu</th>
          <th style={{ width: "33%" }}>date</th>
        </tr>
      </thead>
      <tbody>
        {concertsProps.concerts.map((concert: Concert) => (
          <tr key={concert.id}>
            <td>
              <Typography>{concert.organizer}</Typography>
            </td>
            <td>
              <Typography>{concert.venue}</Typography>
            </td>
            <td>
              <Typography>
                {dayjs(concert.date).format("DD/MM/YYYY HH:mm")}
              </Typography>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export type ConcertGridProps = {
  concerts: Concert[];
};
