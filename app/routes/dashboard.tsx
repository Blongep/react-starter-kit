/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import OpenInNew from "@mui/icons-material/OpenInNew";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";
import { useCurrentUser } from "../core/auth";
import { usePageEffect } from "../core/page";
import { fetchArtists } from "../services/artist-service";
import { Artist } from "../types/artist";

export const Component = function Dashboard(): JSX.Element {
  usePageEffect({ title: "Dashboard" });

  const [artistsData, setArtistsData] = useState<Artist[]>([]);
  const [currentUser] = useState(useCurrentUser());

  useEffect(() => {
    if (currentUser) {
      setArtistsData(fetchArtists());
    }
  }, [currentUser]);

  return (
    <Container sx={{ py: 2 }}>
      <Typography sx={{ mb: 2 }} level="h2">
        Dashboard
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { sm: "1fr", md: "1fr 1fr" },
          gap: 2,
        }}
      >
        {artistsData.map((artist: Artist) => (
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
        ))}
      </Box>
    </Container>
  );
};
