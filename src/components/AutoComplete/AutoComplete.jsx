import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Stack } from '@mui/material';
import './AutoComplete.css'

export default function AutoComplete({ nombre, array, onChange }) {
  const [value, setValue] = React.useState(null); 


  return (
    <Stack spacing={1} sx={{ width: 250 }}>
    <Autocomplete
        disablePortal
        id="disable-close-on-select"
        disableCloseOnSelect
        options={array}
        value={value} 
        onChange={(event, newValue) => {
          if (newValue && newValue.label) {
            setValue(newValue);
            onChange(newValue.label); 
          } else {
            setValue(null);
            onChange(''); 
          }
        }}
        sx={{ m: 1,  }} size="small" 
        PopperProps={{
          style: { marginTop: '8px'}
        }}
        getOptionLabel={(option) => (option.label || '').toString()}
        renderInput={(params) => (
          <TextField {...params} label={nombre} variant="standard" className='le' />
        )}
      />

      </Stack>
  );
};