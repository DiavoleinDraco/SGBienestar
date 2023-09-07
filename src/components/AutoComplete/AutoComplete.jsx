import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Stack } from '@mui/material';

export default function AutoComplete({ nombre, array, obligatorio }) {
  const [value, setValue] = React.useState(null); 

  return (
    <Stack spacing={1} sx={{ width: 300 }}>
    <Autocomplete
        className='autocomplete'
        disablePortal
        id="disable-close-on-select"
        disableCloseOnSelect
        options={array}
        value={value} 
        onChange={(event, newValue) => {
          setValue(newValue);
        }}  
        sx={{ m: 1, width: '25ch' }} size="small" 
        PopperProps={{
          style: { marginTop: '8px' }
        }}
        renderInput={(params) => (
          <TextField {...params} label={nombre} required={obligatorio} variant="standard" />
        )}
      />
      </Stack>
  );
};