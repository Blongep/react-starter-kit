import { Button, FormControl, Input, Stack } from "@mui/joy";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dayjs } from "dayjs";
import "dayjs/locale/fr";
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
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const newAvailability: Availability = {
            id: "",
            artistId: availabilitiesFormProps.artistId,
            artistName: "",
            startDate: startDate as Dayjs,
            endDate: endDate as Dayjs,
            region: region as string,
            options: [],
          };
          await addAvailability(newAvailability);
          availabilitiesFormProps.updateState();
          setRegion("");
          setStartDate(null);
          setEndDate(null);
        }}
      >
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
      </form>
    </LocalizationProvider>
  );
}

export type AvailabilitiesFormProps = {
  artistId: string;
  updateState: () => void;
};
