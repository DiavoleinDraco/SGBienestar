import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Stack } from '@mui/material';
import './AutoComplete.css'



export default function AutoComplete({ nombre, array, obligatorio }) {
  const [value, setValue] = React.useState(null); 

  return (
    <Stack className='stack' spacing={1} sx={{ width: 300 }}>
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
        sx={{ m: 1,  }} size="small" 
        PopperProps={{
          style: { marginTop: '8px'}
        }}
        renderInput={(params) => (
          <TextField {...params} label={nombre} required={obligatorio} variant="standard"  className='le'/>
        )}
      />

      </Stack>
  );
};
