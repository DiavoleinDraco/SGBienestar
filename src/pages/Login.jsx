import React from 'react';
import { Link } from "react-router-dom";
import InputCorreo from "../components/ComantCorreo/ComantCorreo.jsx";
import ContraseñaLogin from '../components/ContraseñaLogin/ContraseñaLogin.jsx';
import Buttons from '../components/Buttons/Buttons.jsx';
import { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from '@mui/material/Stack';
import { forwardRef } from "react";

export default function Login() {
  const [info, setInfo] = useState({});
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  
  let updatedInfo = null
  const handleChange = (fieldName, fieldValue) => {
    setInfo((prevInfo) => {
      updatedInfo = { ...prevInfo, [fieldName]: fieldValue}
      return updatedInfo
    });
    setErrors((prevErrors) => {
      return { ...prevErrors, [fieldName]: '' };
    });
  };

  const validarCamposObligatorios = () => {
    const camposObligatorios = ['correo_inst', 'contrasena'];
    const errores = {};

    camposObligatorios.forEach((campo) => {
      if (!info[campo] || info[campo] === false) {
        errores[campo] = 'Este campo es obligatorio.';
      }
    });

    setErrors(errores);
    return Object.keys(errores).length === 0;
  };

  const realizarInicioSesion = () => {
    console.log('Inicio de sesion exitoso', info)
  };

  const handleRegistroClick = () => {
    const camposObligatoriosLlenos = validarCamposObligatorios();
    if(camposObligatoriosLlenos){
      realizarInicioSesion()
    } else {
      console.log('nada')
      setOpen(true);
    }
  };


  return (
    <div className='padre'>
      <h1>Login</h1>

      <InputCorreo 
      label='Correo institucional' 
      institutional 
      onChange={(value) => handleChange('correo_inst', value)}
      required/>

      <ContraseñaLogin 
      onChange={(value) => handleChange('contrasena', value)}
      nombre='Contraseña'
      required/>

      <Buttons 
      nombre='Iniciar sesión'
      onclick={handleRegistroClick}/>

      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
             Completa todos los campos obligatorios y de forma correcta!
          </Alert>
        </Snackbar>
      </Stack>

      <Link to="/home">Home</Link>
    </div>
  );
};