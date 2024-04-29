import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Container, Paper, Typography } from "@mui/material";
import { Logout } from "@mui/icons-material";
export default function LogoutPage() {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  return (
    <Button
      variant="outlined"
      onClick={() => {
        console.log(window.location);
        logout({ logoutParams: { returnTo: window.location.origin } });
      }}
      endIcon={<Logout />}
      sx={{ marginLeft: "auto" }}
    >
      <Typography variant="h6">Logout</Typography>
    </Button>
  );
}
