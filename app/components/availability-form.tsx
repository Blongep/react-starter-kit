import {Button, FormControl, Stack} from "@mui/joy"
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import {DatePicker} from "@mui/x-date-pickers"
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs"
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider"
import {Dayjs} from "dayjs"
import "dayjs/locale/fr"
import {useEffect, useState} from "react"
import {addAvailability} from "../services/artist-service"
import {fetchRegionsDepartments} from "../services/ext-service"
import {Availability} from "../types/availability"

export function AvailabilityForm(
  availabilitiesFormProps: AvailabilitiesFormProps,
): JSX.Element {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [zoneMap, setZoneMap] = useState(new Map<number,string>());
  const [mapKeys, setMapKeys] = useState<number[]>([]);
  const updateMap = (k: number, v: string) => {
    setZoneMap(zoneMap.set(k, v));
  };

  const deleteFromMap = (keyToDelete: number) => {

    let tempMap = new Map<number,string>();
    let newKey = 0;
    zoneMap.forEach((value: string, key: number) => {
      if (key !== keyToDelete) {
        tempMap.set(newKey, value);
        newKey++;
      }
    })
    setZoneMap(tempMap);
    setMapKeys(mapKeys.concat(0));
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
    setMapKeys(mapKeys.concat(newKey));
    updateMap(newKey, "");
  };

  const deleteAutocomplete = (key: number) => {
    deleteFromMap(key)
    setMapKeys(mapKeys.filter((number) => number===zoneMap.size));
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
            zones:[ ...zoneMap.values() ] as string[],
            options: [],
          };
          await addAvailability(newAvailability);
          availabilitiesFormProps.updateState();
          setZoneMap(new Map());
          updateMap(0, "");
          setMapKeys([0]);
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
              minDate={startDate || undefined}
              label="Date de fin"
              value={endDate}
              onChange={(newValue: Dayjs | null) => setEndDate(newValue)}
            />
          </FormControl>
          {[...zoneMap.keys()].map((key: number) => (
            <FormControl key={key} required>
              <Autocomplete
                disablePortal
                options={regionsDepartments}
                onChange={(event: any, newValue: string | null) => {
                  newValue ?  updateMap(key, newValue) : updateMap(key, "");
                }}
                renderInput={(params: any) => <TextField {...params} label="Region ou département" />}
              />
            {key !== 0 && <Button onClick={() => deleteAutocomplete(key)}>Supprimer la zone</Button>}
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
