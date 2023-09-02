import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ComSelect({ descrip, items, nombre }) {
  const [elementos, setElementos] = React.useState('');

  const handleChange = (event) => {
    setElementos(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, width: '25ch' }} size="small">
      <InputLabel id="demo-select-small-label">{nombre}</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={elementos}
        label={nombre}
        onChange={handleChange}
      >
        <MenuItem value="">
          {descrip} <em>opciones</em>
        </MenuItem>

        {items.map((element) => (
          <MenuItem key={element} value={element}>
            {element}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}