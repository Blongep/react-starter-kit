import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Box, IconButton, Table, Typography } from "@mui/joy";
import dayjs from "dayjs";
//import { rejectOption, validateOption } from "../services/artist-service";
import { cancelOption, validateOption } from "../services/artist-service";
import { Availability } from "../types/availability";
import { Option } from "../types/option";

export function AvailabilityArtistGrid(
  availabilitiesProps: AvailabilityGridProps,
): JSX.Element {
  return (
    <Table aria-label="basic table">
      <thead>
        <tr>
          <th style={{ width: "33%" }}>Région</th>
          <th style={{ width: "33%" }}>Date de début</th>
          <th style={{ width: "33%" }}>Date de fin</th>
        </tr>
      </thead>
      <tbody>
        {availabilitiesProps.availabilities.map(
          (availability: Availability) => (
            <>
              <tr key={availability.id}>
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
              </tr>
              {availability.options?.map((option: Option) => (
                <Box key={option.id} sx={{ ml: 3, width: "80%" }}>
                  <tr>
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
                    <td>
                      <IconButton
                        sx={{ mb: 1 }}
                        variant="plain"
                        onClick={async () => {
                          await validateOption(option);
                          availabilitiesProps.updateState();
                        }}
                      >
                        <CheckCircleOutlineIcon />
                      </IconButton>
                    </td>
                    <td>
                      <IconButton
                        sx={{ mb: 1 }}
                        variant="plain"
                        onClick={async () => {
                          await cancelOption(option.id);
                          availabilitiesProps.updateState();
                        }}
                      >
                        <CancelIcon />
                      </IconButton>
                    </td>
                  </tr>
                </Box>
              ))}
            </>
          ),
        )}
      </tbody>
    </Table>
  );
}

export type AvailabilityGridProps = {
  availabilities: Availability[];
  updateState: () => void;
};
