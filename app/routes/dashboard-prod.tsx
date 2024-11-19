/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Box, Container, Stack, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { AvailabilityProdGrid } from "../components/availabilites-prod-grid";
import { useCurrentUser } from "../core/auth";
import { usePageEffect } from "../core/page";
import { fetchAvailabilities } from "../services/artist-service";
import { Availability } from "../types/availability";

export const Component = function DashboardProd(): JSX.Element {
  usePageEffect({ title: "Dashboard Prod" });

  const [availabilityData, setAvailabilityData] = useState<Availability[]>([]);
  const [currentUser] = useState(useCurrentUser());

  async function fetchAvailabilityData() {
    if (currentUser) {
      try {
        const availabilities = await fetchAvailabilities();
        setAvailabilityData(availabilities);
      } catch (error) {
        console.error("Error fetching availability data:", error);
      }
    }
  }

  useEffect(() => {
    fetchAvailabilityData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  function handleUpdate(): void {
    fetchAvailabilityData();
  }

  return (
    <Container sx={{ py: 2 }}>
      <Typography sx={{ mb: 2 }} level="h2">
        Dashboard Prod
      </Typography>

      <Box sx={{ width: "100%" }}>
        <Stack spacing={3}>
          <Typography sx={{ mb: 1 }} level="h3">
            Disponibilités
          </Typography>
          <AvailabilityProdGrid
            availabilities={availabilityData || []}
            updateState={handleUpdate}
          />
        </Stack>

        {/* {venueData.map((artist: Artist) => (
          <Card key={artist.id}>
            <CardContent sx={{ minHeight: 150 }}>
              <Button
                variant="plain"
                component="a"
                href={`/artist/${artist.shortName}`}
                startDecorator={<OpenInNew />}
              >
                <Typography level="h3">{artist.longName}</Typography>
              </Button>
              <Typography>{artist.description}</Typography>
            </CardContent>
          </Card>
        ))} */}
      </Box>
    </Container>
  );
};
