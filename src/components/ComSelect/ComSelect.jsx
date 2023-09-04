import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ComSelect({ descrip, items, nombre, required }) {
  const [elementos, setElementos] = React.useState('');
  const [error, setError] = React.useState(false); 

  const handleChange = (event) => {
    setElementos(event.target.value);
    setError(false);
  };

  const handleBlur = () => {
    if (required && elementos === '') {
      setError(true);
    }
  };

  return (
    <FormControl sx={{ m: 1, width: '25ch' }} size="small" required={required}>
      <InputLabel id="demo-select-small-label">{nombre}</InputLabel>
      <Select
        className='comselect'
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={elementos}
        label={nombre}
        onChange={handleChange}
        onBlur={handleBlur} 
        error={error} 
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
      {error && <p style={{ color: 'red' }}>Este campo es obligatorio.</p>}
    </FormControl>
  );
}