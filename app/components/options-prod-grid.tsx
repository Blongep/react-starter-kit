import { Table, Typography } from "@mui/joy";
import dayjs from "dayjs";
//import { rejectOption, validateOption } from "../services/artist-service";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/fr";
import { Availability } from "../types/availability";
import { Option } from "../types/option";

export function OptionsProdGrid(
  availabilitiesProps: OptionGridProps,
): JSX.Element {
  return (
    <Table aria-label="basic table">
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
        <thead>
          <tr>
            <th style={{ width: "12.5%" }}>Artiste</th>
            <th style={{ width: "12.5%" }}>Région</th>
            <th style={{ width: "12.5%" }}>
              Date de début de la disponibilité
            </th>
            <th style={{ width: "12.5%" }}>Date de fin de la disponibilité</th>
            <th style={{ width: "12.5%" }}>Organisateur</th>
            <th style={{ width: "12.5%" }}>Lieu</th>
            <th style={{ width: "12.5%" }}>Date de l&apos;option</th>
            <th style={{ width: "12.5%" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {availabilitiesProps.availabilities.map(
            (availability: Availability) =>
              availability.options?.length > 0 && (
                <tr key={availability.id}>
                  <td>
                    <Typography>{availability.artistName}</Typography>
                  </td>
                  <td>
                    <Typography>{availability.region}</Typography>
                  </td>
                  <td>
                    <Typography>
                      {dayjs(availability.startDate).format("DD/MM/YYYY")}
                    </Typography>
                  </td>
                  <td>
                    <Typography>
                      {dayjs(availability.endDate).format("DD/MM/YYYY")}
                    </Typography>
                  </td>
                  {availability.options?.map((option: Option) => (
                    <>
                      <td>
                        <Typography>{option.organizer}</Typography>
                      </td>
                      <td>
                        <Typography>{option.venueName}</Typography>
                      </td>
                      <td>
                        <Typography>
                          {dayjs(option.date).format("DD/MM/YYYY")}
                        </Typography>
                      </td>
                    </>
                  ))}
                </tr>
              ),
          )}
        </tbody>
      </LocalizationProvider>
    </Table>
  );
}

export type OptionGridProps = {
  availabilities: Availability[];
  updateState: () => void;
};
