import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputCorreo from '../../components/ComantCorreo/ComantCorreo';
import ButtonContraseña from '../../components/ButtonContraseña/ButtonContraseña';
import Textfield from '../../components/Textfield/Textfield';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { forwardRef } from 'react';
import { post } from '../../UseFetch'
import './RecuperarContrasena.css';

export default function RecuperarContrasena() {
  const [info, setInfo] = useState({});
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleChange = (fieldName, fieldValue) => {
    setInfo((prevInfo) => ({
      ...prevInfo,
      [fieldName]: fieldValue,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: '',
    }));
  };

  const validarCamposObligatorios = () => {
    const camposObligatorios = ['correo_inst', 'codigo', 'contrasena'];
    const errores = {};

    camposObligatorios.forEach((campo) => {
      if (!info[campo] || info[campo] === false) {
        errores[campo] = 'Este campo es obligatorio.';
      }
    });

    setErrors(errores);
    return Object.keys(errores).length === 0;
  };

  const handleRecuperarContrasenaClick = async () => {
    const camposObligatoriosLlenos = validarCamposObligatorios();
    if (camposObligatoriosLlenos) {
      try {
        const response = await post('la ruta asignada para enviar el codigo', info);
        console.log('aqui ira la respuesta del backend', response);

        // nota1: manejar los errores y ver la respuesta del backend

      } catch (error) {
        console.error('Error en la solicitud POST:', error);
        //nota2: Maneja el error 2, avisar al usuario
      }
    } else {
      setOpen(true);
    }
  };
  

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="container-padre">
      <div>   
      <h1 className="tittle">Recupera tu contraseña</h1>
      </div>
      <ul id='sliderrr'>

        <li className='sldrr1'>

        <div className="son">
        <InputCorreo
          label="Correo institucional"
          institutional
          onChange={(value) => handleChange('correo_inst', value)}
          required
          error={errors.correo_inst}
        />
      </div>
        </li>

        <li className='sldrr2'>

        <div className="son">
        <Textfield
          name="Codigo"
          onChange={(value) => handleChange('codigo', value)}
          required
          error={errors.codigo}
        />
      </div>
        </li>


        <li className='sldrr3'>
        <div className="son">
        <ButtonContraseña
          nombre="Nueva contraseña"
          onChange={(value) => handleChange('contrasena', value)}
          required
          error={errors.contrasena}
        />
      </div>
      <div className="item">
        <button onClick={handleRecuperarContrasenaClick}>Recuperar Contraseña</button>
      </div>


        </li>
      </ul>

      <ul className='menu-1'>
        <li><a href="#sldrr1"></a>1</li>
        <li><a href="#sldrr2"></a>2</li>
        <li><a href="#sldrr3"></a>3</li>
       
     



      </ul>


      <div className="item">
        <Link to="/login">Volver al inicio de sesión</Link>
      </div>

      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%', background: '' }}>
            Completa todos los campos obligatorios y de forma correcta.
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
}
