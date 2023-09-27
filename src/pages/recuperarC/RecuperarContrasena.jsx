import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InputCorreo from '../../components/ComantCorreo/ComantCorreo';
import ButtonContraseña from '../../components/ButtonContraseña/ButtonContraseña';
import Textfield from '../../components/Textfield/Textfield';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { forwardRef } from 'react';
import  get, {  post } from '../../UseFetch'
import './RecuperarContrasena.css';

export default function RecuperarContrasena() {
  const [correo, setCorreo] = useState('');
  const [codigo, setCodigo] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [valueI, actualizarI] = useState([]);
  const [errorMensaje, setErrorMensaje] = useState('');
  const [envioExitoso, setEnvioExitoso] = useState(false);
  const [correoError, setCorreoError] = useState(false);
  


  const nextSlide = () => {
    if (currentSlide < 2) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleChange = (fieldName, fieldValue) => {
    if (fieldName === 'correo') {
      setCorreo(fieldValue);
    } else if (fieldName === 'codigo') {
      setCodigo(fieldValue);
    } else if (fieldName === 'newPassword') {
      setNewPassword(fieldValue);
    }
  };

  useEffect(() => {
    get('/dominio-sena')
      .then((data) => {
        actualizarI(data);
      })
      .catch((error) => {
        console.error('Error al encontrar resultado', error);
      });
  }, []);

  
  const handleEnviarCorreo = async () => {
    setErrorMensaje('');
  
    if (!correo) {
      setCorreoError(true);
      setOpen(true);
      return;
    }
  
    const InstitucionalEmailValid = valueI.map((item) => item.nombre);
  
    if (!InstitucionalEmailValid.some((domain) => correo.endsWith(domain))) {
      setCorreoError(true);
      setOpen(true);
      return;
    }
  
    try {
      console.log(correo);
      const response = await post('/registro/rest', { correo });
      console.log('Respuesta del backend:', response);
  
      if (response && response.message === 'Correo enviado') {
        setEnvioExitoso(true);
      } else {
        console.log('Envío del código exitoso.');
        
      }
    } catch (error) {
      console.error('Error en la solicitud POST:', error);

      if (error.message === 'Usuario no encontrado. Por favor, regístrese.') {

      } else {
        setErrorMensaje('Error en la solicitud para enviar el correo. Usuario no encontrado. Por favor, regístrese o  verifique que ha incresado su correo correctamente');
      }
    }
  };

  

  const handleCambiarContrasena = async () => {
    if (!correo || !codigo || !newPassword) {
      setErrorMensaje('Debes completar todos los campos antes de cambiar la contraseña.');
      return;
    }
  
    const data = { correo, codigo, newPassword };
  
    try {
      const response = await post('/registro/rest/password', data);
      console.log('respuesta', response);
  
      if (response && response.statusCode === 202 && response.message === 'Se ha actualizado la contraseña') {
        console.log('Contraseña cambiada exitosamente');
        
      } else {
        setErrorMensaje('Error al cambiar la contraseña');
      }
    } catch (error) {
      console.error('Error en la solicitud POST para cambiar la contraseña:', error);
      if (error.message === 'El correo institucional o la contraseña no coinciden') {
        
        setErrorMensaje('El correo institucional o la contraseñas no coinciden. Por favor, verifique sus credenciales.');
      } else {
        setErrorMensaje('Error en la solicitud para cambiar la contraseña.');
      }
    }
  };
  

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

//_____________/////_____________


  return (
    <div className="padrecontenedor">
      <div>
        <h1 className="tittlee">Recupera tu contraseña</h1>
      </div>
      <ul className="sldrr">
        <li className={currentSlide === 0 ? "active" : "inactive"} id="slidee1">
          <div className="son">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="30"
              fill="currentColor"
              className="carta bi-envelope-fill"
              viewBox="0 0 16 16"
            >
              <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
            </svg>
            <i class="bi bi-envelope-fill"></i>
            <div className='son-correo'>
            <InputCorreo
              label="Correo institucional"
              institutional
              onChange={(value) => handleChange('correo', value)}
              required
              error={errors.correo_inst}
            />
            </div>
    
          </div>

          <button className='btn-env-correo' onClick={handleEnviarCorreo}>Enviar Codigo</button>

        </li>

        <li className={currentSlide === 1 ? "active" : "inactive"} id="slidee2">
          <div className="son son-codigo">
            <Textfield
              className="son-codigo"
              name="Ingrese el codigo"
              onChange={(value) => handleChange("codigo", value)}
              required
              error={errors.codigo}
            />
          </div>
        </li>

        <li className={currentSlide === 2 ? "active" : "inactive"} id="slidee3">
          <div className="son">
            <ButtonContraseña
              nombre="nueva contraseña"
              onChange={(value) => handleChange('newPassword', value)}
              required
              error={errors.contrasena}
            />
          </div>
          <div className="item btn-rcontra-one">
            <button className='btn-rcontra' onClick={handleCambiarContrasena}>Recuperar Contraseña</button>
          </div>
        </li>
      </ul>
      <button className="btn-siguiente" disabled={currentSlide === 0} onClick={() => setCurrentSlide(currentSlide - 1)}>Anterior</button>
      <button className="btn-siguiente" onClick={nextSlide}>Siguiente</button>
      
      <div className="item item-link">
        <Link className="custom-link " to="/login">
          Volver al inicio de sesión
        </Link>
      </div>

      
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          sx={{ width: "100%", background: "" }}
        >
          {!correo ? 'El campo de correo es obligatorio.' : 'El correo electrónico no es válido. Debe ser un correo institucional.'}
        </Alert>
      </Snackbar>
      {envioExitoso && (
        <Alert
         onClose={() => setEnvioExitoso(false)} 
         severity="success"
        sx={{ width: "100%", background: "" }}
          >El código se ha enviado exitosamente, por favor revise su correo electrónico
      </Alert>
      )}
      {errorMensaje && (
     <Alert
        onClose={() => setErrorMensaje('')}
        severity="error"
       sx={{ width: "100%", background: "" }}
        >
         { errorMensaje}
        </Alert>
        )}
    </Stack>

    </div>
  );
}