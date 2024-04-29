import { Box } from "@mui/material";
import React from "react";

export default function IconComp({ children }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", marginRight: "10px" }}>
      {children}
    </Box>
  );
}
