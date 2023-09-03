import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function Textfield({ nombre, required }) {
  const [error, setError] = React.useState(false); 

  const handleBlur = (event) => {
    if (required && event.target.value === '') {
      setError(true);
    }
  };

  return (
    <div>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onBlur={handleBlur}
      >
        <TextField id="outlined-basic" label={nombre} variant="outlined" />
      </Box>
      {error && <p style={{ color: 'red' }}>Este campo es obligatorio.</p>}
       
    </div>
  );
}
