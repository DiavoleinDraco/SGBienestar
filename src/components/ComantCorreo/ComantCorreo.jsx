import * as React from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import './ComantCorreo.css';

export default function InputCorreo({ label, personal, institutional, onChange }) {
  const [email, setEmail] = React.useState('');
  const isEmailValid = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);
  const isInstitutionalEmailValid = /@soy\.sena\.edu\.co$/.test(email) || /\@sena\.edu\.co$/.test(email);

  const handleInputChange = (e) => {
    const fieldValue = e.target.value;
    setEmail(e.target.value);
    onChange(fieldValue);
  };


  const esCorreoPersonalValido = personal ? isEmailValid : true;
  const esCorreoInstitucionalValido = institutional ? isInstitutionalEmailValid : true;

  return (
    <FormControl className='f'>
      <InputLabel className='email' htmlFor="email-input">{label}</InputLabel>
      <Input
        id="email-input"
        type="email"
        value={email}
        onChange={handleInputChange}
        error={!esCorreoPersonalValido || !esCorreoInstitucionalValido}
        fullWidth
        required
      />
      {(!esCorreoPersonalValido || !esCorreoInstitucionalValido) && (
        <p style={{ color: 'black' }}>Correo electrónico no válido</p>
      )}
    </FormControl>
  );
};
