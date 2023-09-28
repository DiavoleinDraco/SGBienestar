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
    <div className="padrecontenedor">
      <div>
        <h1 className="tittlee">Recupera tu contraseña</h1>
      </div>
      <ul className='sldrr'>
        <li id='slidee1'>
          <div className="son">
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="30" fill="currentColor" class="carta bi-envelope-fill" viewBox="0 0 16 16">
              <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
            </svg>
            <i class="bi bi-envelope-fill"></i>
            <div className='son-correo'>
            <InputCorreo
              label="Correo institucional"
              institutional
              onChange={(value) => handleChange('correo_inst', value)}
              required
              error={errors.correo_inst}
            />
            </div>
          </div>
        </li>

        <li id='slidee2'>
          <div className="son son-codigo">
            <Textfield
              className="son-codigo"
              name="Codigo"
              onChange={(value) => handleChange('codigo', value)}
              required
              error={errors.codigo}
            />
          </div>
        </li>


        <li id='slidee3' >
          <div className="son">
            <ButtonContraseña
              nombre="Nueva contraseña"
              onChange={(value) => handleChange('contrasena', value)}
              required
              error={errors.contrasena}
            />
          </div>
          <div className="item btn-rcontra-one">
            <button className='btn-rcontra' onClick={handleRecuperarContrasenaClick}>Recuperar Contraseña</button>
          </div>
        </li>
      </ul>

      <ul className='menu-1'>
        <li className='li'><a className='a' href="#slidee1">1</a></li>
        <li className='li'><a className='a' href="#slidee2">2</a></li>
        <li className='li'><a className='a' href="#slidee3">3</a></li>
      </ul>


      <div className="item item-link">
        <Link className='custom-link ' to="/login">Volver al inicio de sesión</Link>
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