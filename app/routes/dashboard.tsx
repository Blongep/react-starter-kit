import { Box, Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const Component = function Dashboard(): JSX.Element {
  return (
    <Container>
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the Dashboard
        </Typography>
        <Typography variant="h6" gutterBottom>
          Please choose an option below:
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/dashboard/agent"
            sx={{ mr: 2 }}
          >
            Agent Dashboard
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/dashboard/prod"
          >
            Prod Dashboard
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
