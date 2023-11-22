import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import "./Cargando.css";

export default function CircularColor() {
  return (
    <Stack style={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}} sx={{ color: 'grey.500' }} spacing={2} direction="row">
      <CircularProgress color="secondary" />
    </Stack>
  );
}