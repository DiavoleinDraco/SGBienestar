import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function Buttons({ nombre }) {
  return (
    <Stack direction="row" spacing={2}>
      <Button className='buttons' variant="outlined">{nombre}</Button>
    </Stack>
  );
}