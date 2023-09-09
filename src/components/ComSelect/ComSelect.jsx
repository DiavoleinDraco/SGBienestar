import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import './ComSelect.css'

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
    <div>
      <FormControl className='contene' variant="standard" sx={{ m: 1, width: '25ch' }} size="small" required={required}>
        <InputLabel id="demo-simple-select-standard-label">{nombre}</InputLabel>
        <Select
          className='comselect'
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={elementos}
          onChange={handleChange}
          label={nombre}
          onBlur={handleBlur} 
          error={error} 

        >
          <MenuItem value="">
          {descrip} <em>opciones</em>
          </MenuItem>
          {items.map((element) => (
          <MenuItem key={element} value={element} >
            {element}
          </MenuItem>
        ))}
      </Select>
      {error && <p style={{ color: 'red' }}>Este campo es obligatorio.</p>}
    </FormControl>
    </div>

  );
};