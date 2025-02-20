import { Button, FormControl, Stack } from "@mui/joy";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dayjs } from "dayjs";
import "dayjs/locale/fr";
import { useEffect, useState } from "react";
import { addAvailability } from "../services/artist-service";
import { fetchRegionsDepartments } from "../services/ext-service";
import { Availability } from "../types/availability";

export function AvailabilityForm(
  availabilitiesFormProps: AvailabilitiesFormProps,
): JSX.Element {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [region, setRegion] = useState<string>("");

  const [regionsDepartments, setRegionsDepartments] = useState<string[]>([]);

    useEffect(() => {
      async function fetchData() {
        setRegionsDepartments(await fetchRegionsDepartments());
      }
      fetchData();
    }, []);
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
              disablePast
              label="Date de début"
              value={startDate}
              onChange={(newValue: Dayjs | null) => setStartDate(newValue)}
            />
          </FormControl>
          <FormControl required>
            <DatePicker
              disablePast
              minDate={startDate}
              label="Date de fin"
              value={endDate}
              onChange={(newValue: Dayjs | null) => setEndDate(newValue)}
            />
          </FormControl>
          <FormControl required>
            <Autocomplete
              disablePortal
              value={region}
              options={regionsDepartments}
              onChange={(event: any, newValue: FilmOptionType | null) => {
                setRegion(newValue);
              }}
              renderInput={(params: any) => <TextField {...params} label="Region ou département" />}
            />
          </FormControl>
          <Button
            disabled={startDate === null || endDate === null || region === null || region === "" || startDate.isAfter(endDate)}
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
