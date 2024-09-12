import dayjs from "dayjs";
import { Artist } from "../types/artist";
import { Availability } from "../types/availability";
import { Concert } from "../types/concert";

const artists: Artist[] = [
  {
    id: 0,
    shortName: "malkavian",
    longName: "Malkavian",
    description: "Black/Death",
    image: "placeholder",
    availabilities: [
      {
        id: 0,
        artistShortName: "malkavian",
        region: "Poitou-Charentes",
        startDate: dayjs("2025-01-01"),
        endDate: dayjs("2025-01-31"),
        options: [],
      },
      {
        id: 1,
        artistShortName: "malkavian",
        region: "Creuse",
        startDate: dayjs("2025-02-01"),
        endDate: dayjs("2025-02-28"),
        options: [
          {
            id: 0,
            organizer: "Crumble Fight",
            venue: "Cold Crash",
            date: dayjs("2025-02-15T20:00:00"),
          },
        ],
      },
    ],
    concerts: [
      {
        id: 0,
        date: dayjs("2025-03-01T20:00:00"),
        organizer: "Live Nation",
        venue: "Le Trianon",
      },
      {
        id: 1,
        date: dayjs("2025-04-01T21:00:00"),
        organizer: "AEG Presents",
        venue: "Le Transbordeur",
      },
    ],
  },
  {
    id: 1,
    shortName: "gojira",
    longName: "Gojira",
    description: "Prog",
    image: "placeholder",
    availabilities: [
      {
        id: 2,
        artistShortName: "gojira",
        region: "Poitou-Charentes",
        startDate: dayjs("2025-01-01"),
        endDate: dayjs("2025-01-31"),
        options: [],
      },
      {
        id: 3,
        artistShortName: "gojira",
        region: "Creuse",
        startDate: dayjs("2025-02-01"),
        endDate: dayjs("2025-02-28"),
        options: [],
      },
    ],
    concerts: [
      {
        id: 2,
        date: dayjs("2025-03-01T20:00:00"),
        organizer: "Live Nation",
        venue: "Le Trianon",
      },
      {
        id: 3,
        date: dayjs("2025-04-01T21:00:00"),
        organizer: "AEG Presents",
        venue: "Le Transbordeur",
      },
    ],
  },
  {
    id: 2,
    shortName: "sierra",
    longName: "Sierra",
    description: "EBM",
    image: "placeholder",
    availabilities: [
      {
        id: 4,
        artistShortName: "sierra",
        region: "Poitou-Charentes",
        startDate: dayjs("2025-01-01"),
        endDate: dayjs("2025-01-31"),
        options: [],
      },
      {
        id: 5,
        artistShortName: "sierra",
        region: "Creuse",
        startDate: dayjs("2025-02-01"),
        endDate: dayjs("2025-02-28"),
        options: [],
      },
    ],
    concerts: [
      {
        id: 4,
        date: dayjs("2025-03-01T20:00:00"),
        organizer: "Live Nation",
        venue: "Le Trianon",
      },
      {
        id: 5,
        date: dayjs("2025-04-01T21:00:00"),
        organizer: "AEG Presents",
        venue: "Le Transbordeur",
      },
    ],
  },
  {
    id: 3,
    shortName: "codeorange",
    longName: "Code Orange",
    description: "Metalcore",
    image: "placeholder",
    availabilities: [
      {
        id: 6,
        artistShortName: "codeorange",
        region: "Poitou-Charentes",
        startDate: dayjs("2025-01-01"),
        endDate: dayjs("2025-01-31"),
        options: [],
      },
      {
        id: 7,
        artistShortName: "codeorange",
        region: "Creuse",
        startDate: dayjs("2025-02-01"),
        endDate: dayjs("2025-02-28"),
        options: [],
      },
    ],
    concerts: [
      {
        id: 6,
        date: dayjs("2025-03-01T20:00:00"),
        organizer: "Live Nation",
        venue: "Le Trianon",
      },
      {
        id: 7,
        date: dayjs("2025-04-01T21:00:00"),
        organizer: "AEG Presents",
        venue: "Le Transbordeur",
      },
    ],
  },
];

export const fetchArtists = (): Artist[] => {
  const data = localStorage.getItem("artists");
  if (data === null) {
    localStorage.setItem("artists", JSON.stringify(artists));
    return artists;
  }
  const parsedData = JSON.parse(data);
  return parsedData || [];
};

export const fetchArtist = (shortArtistName: string): Artist => {
  const artistFound = fetchArtists().find(
    (artist) => artist.shortName === shortArtistName,
  );
  if (artistFound === undefined) {
    throw new Response("Not Found", { status: 404 });
  }
  return artistFound;
};

export const addAvailability = (
  availability: Availability,
  artistShortName: string,
): void => {
  const currentArtists = fetchArtists();
  const artistIndex = currentArtists.findIndex(
    (artist) => artist.shortName === artistShortName,
  );
  if (artistIndex === undefined) {
    throw new Response("Not Found", { status: 404 });
  }
  currentArtists[artistIndex].availabilities =
    currentArtists[artistIndex].availabilities.concat(availability);
  localStorage.setItem("artists", JSON.stringify(currentArtists));
};

export const validateOption = (optionId: number): void => {
  const currentArtists = fetchArtists();
  const artistIndex = currentArtists.findIndex((artist) =>
    artist.availabilities.some((availability) =>
      availability.options?.some((option) => option.id === optionId),
    ),
  );
  if (artistIndex === undefined) {
    throw new Response("Not Found", { status: 404 });
  }
  const availabilityIndex = currentArtists[
    artistIndex
  ].availabilities.findIndex((availability) =>
    availability.options?.some((option) => option.id === optionId),
  );
  if (availabilityIndex === undefined) {
    throw new Response("Not Found", { status: 404 });
  }
  const optionIndex = currentArtists[artistIndex].availabilities[
    availabilityIndex
  ].options.findIndex((option) => option.id === optionId);
  if (optionIndex === undefined) {
    throw new Response("Not Found", { status: 404 });
  }

  const currentOption =
    currentArtists[artistIndex].availabilities[availabilityIndex].options[
      optionIndex
    ];
  const newConcert: Concert = {
    id: Math.random() * 1000,
    date: currentOption.date,
    organizer: currentOption.organizer,
    venue: currentOption.venue,
  };
  currentArtists[artistIndex].concerts =
    currentArtists[artistIndex].concerts.concat(newConcert);

  currentArtists[artistIndex].availabilities[availabilityIndex].options.splice(
    optionIndex,
    1,
  );

  localStorage.setItem("artists", JSON.stringify(currentArtists));
};

export const rejectOption = (optionId: number): void => {
  const currentArtists = fetchArtists();
  const artistIndex = currentArtists.findIndex((artist) =>
    artist.availabilities.some((availability) =>
      availability.options.some((option) => option.id === optionId),
    ),
  );
  if (artistIndex === undefined) {
    throw new Response("Not Found", { status: 404 });
  }
  const availabilityIndex = currentArtists[
    artistIndex
  ].availabilities.findIndex((availability) =>
    availability.options.some((option) => option.id === optionId),
  );
  if (availabilityIndex === undefined) {
    throw new Response("Not Found", { status: 404 });
  }
  const optionIndex = currentArtists[artistIndex].availabilities[
    availabilityIndex
  ].options.findIndex((option) => option.id === optionId);
  if (optionIndex === undefined) {
    throw new Response("Not Found", { status: 404 });
  }

  currentArtists[artistIndex].availabilities[availabilityIndex].options.splice(
    optionIndex,
    1,
  );

  localStorage.setItem("artists", JSON.stringify(currentArtists));
};
