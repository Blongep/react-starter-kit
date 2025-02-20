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
  const [zoneMap, setZoneMap] = useState(new Map<number,string>());
  const updateMap = (k: number, v: string) => {
    setZoneMap(zoneMap.set(k, v));
  };

  const deleteFromMap = (keyToDelete: number) => {
    let tempMap = new Map<number,string>();
    zoneMap.forEach((key: number, value: string) => {
      if (key !== keyToDelete) {
        tempMap.set(key, value);
      }
    })
    setZoneMap(tempMap);
  };

  const [regionsDepartments, setRegionsDepartments] = useState<string[]>([]);

    useEffect(() => {
      async function fetchData() {
        setRegionsDepartments(await fetchRegionsDepartments());
      }
      fetchData();
      updateMap(0, "");
    }, []);

  const addAutocomplete = () => {
    const newKey = zoneMap.size;
    updateMap(newKey, "");
  };

  const deleteAutocomplete = (key: number) => {
    deleteFromMap(key)
  };

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
            zones: zones.values as string[],
            options: [],
          };
          await addAvailability(newAvailability);
          availabilitiesFormProps.updateState();
          setZoneMap(new Map());
          updateMap(0, "");
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
          {zoneMap.keys().map((key: number) => (
            <FormControl key={key} required>
              <Autocomplete
                disablePortal
                value={zoneMap.get(key)}
                options={regionsDepartments}
                onChange={(event: any, newValue: FilmOptionType | null) => {
                  updateMap(key, newValue);
                }}
                renderInput={(params: any) => <TextField {...params} label="Region ou département" />}
              />
            {key !== 0 && <Button onClick={() => deleteAutocomplete(key)}></Button>}
            </FormControl>
          ))}

          <Button onClick={addAutocomplete}>Zone Supplémentaire</Button>
          <Button
            disabled={startDate === null || endDate === null || startDate.isAfter(endDate)}
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
