import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import './Buttons.css';

export default function Buttons({ nombre, onclick, Disabled}) {

  return (
    <Stack  className='pad' direction="row" spacing={2}>
      <Button className='buttons' variant="outlined" onClick={onclick} disabled={Disabled}>{nombre}</Button>
    </Stack>
  );
}