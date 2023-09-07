import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './Textfield.css';

  

export default function Textfield({ nombre, required }) {
  const handleBlur = (event) => {
    if (required && event.target.value === '') {
      setError(true);
    } else {
      setError(false);
    }
  }; 

  return (
    <div>
      <Box className='letras'
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onBlur={handleBlur}
      >
        <div className='caj'>
          <TextField id="standard-basic" label={nombre} variant="standard" />
        </div>
      </Box>
    </div>
  );
}