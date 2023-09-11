import React, { useState, useEffect } from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import './ComantCorreo.css';
import get from '../../UseFetch';

export default function InputCorreo({ label, personal, institutional, onChange }) {
  const [email, setEmail] = useState('');
  const isEmailValid = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);
  const [valueI, actualizarI] = useState([]);
  const [esSenadominioValid, setSenadominioValid] = useState(true); 

  useEffect(() => {
    get('/dominio-sena')
      .then(data => {
        actualizarI(data);
      })
      .catch(error => {
        console.error('Error al encontrar resultado', error);
      });
  }, []);

  const InstitucionalEmailValid = valueI.map(item => item.nombre);

  const handleInputChange = (e) => {
    const fieldValue = e.target.value;
    setEmail(fieldValue);
    onChange(fieldValue);

    
    const Senadomain = InstitucionalEmailValid.some(domain => fieldValue.endsWith(domain));
    setSenadominioValid(Senadomain);
  };

  const esCorreoPersonalValido = personal ? isEmailValid : true;
  const esCorreoInstitucionalValido = institutional ? esSenadominioValid : true;

  return (
    <FormControl>
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
        <p style={{ color: '#000' }}>Correo electrónico no válido</p>
      )}
    </FormControl>
  );
}




