import { Button, FormControl, Input, Stack } from "@mui/joy";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dayjs } from "dayjs";
import { useState } from "react";
import { addAvailability } from "../services/artist-service";
import { Availability } from "../types/availability";

export function AvailabilityForm(
  availabilitiesFormProps: AvailabilitiesFormProps,
): JSX.Element {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [region, setRegion] = useState<string>("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const newAvailability: Availability = {
          id: Math.random() * 1000,
          artistShortName: availabilitiesFormProps.artistShortName,
          startDate: startDate as Dayjs,
          endDate: endDate as Dayjs,
          region: region as string,
          options: [],
        };
        addAvailability(
          newAvailability,
          availabilitiesFormProps.artistShortName,
        );
        setRegion("");
        setStartDate(null);
        setEndDate(null);
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={2}>
          <FormControl required>
            <DatePicker
              label="Date de début"
              value={startDate}
              onChange={(newValue: Dayjs | null) => setStartDate(newValue)}
            />
          </FormControl>
          <FormControl required>
            <DatePicker
              label="Date de fin"
              value={endDate}
              onChange={(newValue: Dayjs | null) => setEndDate(newValue)}
            />
          </FormControl>
          <FormControl required>
            <Input
              value={region}
              placeholder="Région…"
              onChange={(event) => setRegion(event.target.value)}
            />
          </FormControl>
          <Button
            disabled={startDate === null || endDate === null || region === null}
            type="submit"
            sx={{ mt: 1 }}
          >
            Créer une dispo
          </Button>
        </Stack>
      </LocalizationProvider>
    </form>
  );
}

export type AvailabilitiesFormProps = {
  artistShortName: string;
};
