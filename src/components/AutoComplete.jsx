import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function AutoComplete({ nombre, array }) {
    
  return (
    <Autocomplete
      disablePortal
      id="Campo-autocomplete"
      options={array}
      sx={{ m: 1, width: '25ch' }}
      renderInput={(params) => <TextField {...params} label={nombre} />}
    />
  );
};