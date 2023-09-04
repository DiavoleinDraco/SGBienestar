import * as React from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

export default function ComantCorreo({ label, institutional }) {
  const [email, setEmail] = React.useState('');
  const isEmailValid = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);
  const isInstitutionalEmailValid = /@soy\.sena\.edu\.co$/.test(email);
  
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const isValidEmail = institutional ? isInstitutionalEmailValid : isEmailValid;

  return (
    <FormControl>
      <InputLabel htmlFor="email-input">{label}</InputLabel>
      <Input
        className='comantcorreo'
        id="email-input"
        type="email"
        value={email}
        onChange={handleEmailChange}
        error={!isValidEmail}
        fullWidth
        required
        
      />
      {!isValidEmail && <p style={{ color: 'red' }}>Correo electrónico no válido</p>}
    </FormControl>
  );
}