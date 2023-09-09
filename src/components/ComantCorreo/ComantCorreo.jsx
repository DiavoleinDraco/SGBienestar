import * as React from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import './ComantCorreo.css';

export default function InputCorreo({ label, personal, institutional }) {
  const [email, setEmail] = React.useState('');
  const isEmailValid = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);
  const isInstitutionalEmailValid = /@soy\.sena\.edu\.co$/.test(email) || /\@sena\.edu\.co$/.test(email);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const esCorreoPersonalValido = personal ? isEmailValid : true;
  const esCorreoInstitucionalValido = institutional ? isInstitutionalEmailValid : true;

  return (
    <FormControl>
      <InputLabel htmlFor="email-input">{label}</InputLabel>
      <Input
        className='label'
        id="email-input"
        type="email"
        value={email}
        onChange={handleEmailChange}
        error={!esCorreoPersonalValido || !esCorreoInstitucionalValido}
        fullWidth
        required
      />
      {(!esCorreoPersonalValido || !esCorreoInstitucionalValido) && (
        <p style={{ color: '#000000' }}>Correo electrónico no válido</p>
      )}
    </FormControl>
  );
};
