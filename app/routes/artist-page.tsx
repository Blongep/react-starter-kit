import { Box, Card, CardContent, Container, Stack, Typography } from "@mui/joy";
import Divider from "@mui/joy/Divider";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  AvailabilityArtistGrid,
  AvailabilityForm,
  ConcertGrid,
} from "../components";
import { useCurrentUser } from "../core/auth";
import { usePageEffect } from "../core/page";
import { fetchArtist } from "../services/artist-service";
import { Artist } from "../types/artist";

export const Component = function ArtistPage(): JSX.Element {
  const { artistId } = useParams();
  const [artistData, setArtistData] = useState<Artist>();
  const [currentUser] = useState(useCurrentUser());

  async function fetchData() {
    if (currentUser && artistId) {
      const artist = await fetchArtist(artistId);
      setArtistData(artist);
    }
  }

  function handleUpdate(): void {
    fetchData();
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, artistId]);

  usePageEffect({ title: artistData?.longName });

  return (
    <Container sx={{ py: 2 }}>
      <Typography sx={{ mb: 2 }} level="h2">
        {artistData?.longName}
      </Typography>

      <Box sx={{ width: "100%" }}>
        <Stack spacing={3}>
          <Card sx={{ mb: 2 }} key={artistData?.id}>
            <CardContent sx={{ minHeight: 150 }}>
              <Typography>{artistData?.description}</Typography>
            </CardContent>
          </Card>

          <Divider />

          <Typography sx={{ mb: 1 }} level="h3">
            Disponibilités
          </Typography>
          <AvailabilityArtistGrid
            availabilities={artistData?.availabilities || []}
            updateState={handleUpdate}
          />

          <Divider />

          <Typography sx={{ mb: 1 }} level="h3">
            Dates programmées
          </Typography>
          <ConcertGrid concerts={artistData?.concerts || []} />

          <Divider />

          <Typography sx={{ mb: 1 }} level="h3">
            Nouvelle disponibilité
          </Typography>
          <AvailabilityForm
            artistId={artistId || ""}
            updateState={handleUpdate}
          />
        </Stack>
      </Box>
    </Container>
  );
};
