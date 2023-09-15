import React, { useState, useEffect } from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import './ComantCorreo.css';
import get from '../../UseFetch';


export default function InputCorreo({ label, institutional, onChange, required }){
  const [email, setEmail] = useState('');
  const [valueI, actualizarI] = useState([]);
  const [esSenadominioValid, setSenadominioValid] = useState(true);
  const [error, setError] = useState(''); 

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
  const esCorreoInstitucionalValido = institutional ? esSenadominioValid : true;

  const handleBlur = () => {
    if (required && email === '') {
      setError(true);
    } else {
      setError(false)
    };
  };
  
  return (
    <FormControl>
      <InputLabel className='email' htmlFor="email-input">{label}</InputLabel>
      <Input
        autoComplete="off"
        id="email-input"
        type="email"
        value={email}
        onChange={handleInputChange}
        error={ Boolean(error)}
        onBlur={handleBlur}
        helperText={error}
      />
      {(!esCorreoInstitucionalValido) && (<p style={{ color: 'red' }}>Correo electrónico no válido</p> ) ||
        (error) && (<p style={{ color: "red" }}>Este campo es obligatorio.</p>)}
    </FormControl>
  );
};




