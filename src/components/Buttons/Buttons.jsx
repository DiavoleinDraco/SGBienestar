import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './Buttons.css';

export default function Buttons({ nombre, onclick, type}) {

  return (
    <Stack  className='pad' direction="row" spacing={2}>
      <Button type={type}  className='buttons buttons-log-reg' variant="outlined" onClick={onclick}>{nombre}</Button>
    </Stack>
  );
}