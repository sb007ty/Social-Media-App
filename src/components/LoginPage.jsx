import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Container, Paper, Typography } from "@mui/material";
export default function LoginPage() {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  return (
    <Container
      sx={{
        display: "flex",
        // placeContent: "center",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          placeContent: "center",
          backgroundColor: "BEIGE",
          height: "50vh",
          padding: "50px",
          gap: "10px",
        }}
      >
        {!isAuthenticated && (
          <Typography variant="h4">Welcome. Please login</Typography>
        )}
        {!isAuthenticated && (
          <Button
            onClick={() => {
              loginWithRedirect();
              // navigate("/posts");
            }}
          >
            <Typography variant="h6">Login</Typography>
          </Button>
        )}
      </Paper>
    </Container>
  );
}
