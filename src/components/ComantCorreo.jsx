import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';

export default function ComantCorreo({ label, institucional }) {
  const [email, setEmail] = useState('');
  const emailvalido = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);
  const correoinstitucional= /@soy\.sena\.edu\.co$/.test(email);
  const someOtherValue = "default value";
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const emailValido = institucional ? correoinstitucional : someOtherValue;

  return (
    <FormControl>
      <InputLabel htmlFor="email-input">{label}</InputLabel>
      <TextField
        id="email-input"
        type="email"
        value={email}
        onChange={handleEmailChange}
        error={!emailvalido}
        fullWidth
        required
      />
      {!emailvalido && <p style={{ color: 'red' }}>Correo electrónico no válido</p>}
    </FormControl>
  );
}
