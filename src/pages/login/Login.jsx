import React from 'react';
import { Link } from "react-router-dom";
import InputCorreo from "../../components/ComantCorreo/ComantCorreo.jsx";
import ContraseñaLogin from '../../components/ContraseñaLogin/ContraseñaLogin.jsx';
import Buttons from '../../components/Buttons/Buttons.jsx';
import { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from '@mui/material/Stack';
import { forwardRef } from "react";
import './Login.css'
import miimagen from '../../pages/imagenes/sena-bienestar.png';
import  get, { post } from "../../UseFetch.js";


export default function Login() {
  const [info, setInfo] = useState({});
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [errorMensaje, setErrorMensaje] = useState(null);
  const [valueI, actualizarI] = useState([]);
  const [intentosFallidos, setIntentosFallidos] = useState(0);
  const [loginDeshabilitado, setLoginDeshabilitado] = useState(false);
  const [tiempoRestante, setTiempoRestante] = useState(0);
  const [cuentaRegresivaActiva, setCuentaRegresivaActiva] = useState(false);



  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    } else if(errorMensaje === "Has excedido el límite de intentos fallidos. Intenta nuevamente en 5 minutos." ){
    return;
    } 
    
    setOpen(false);
    setLoginDeshabilitado(false);
    if (cuentaRegresivaActiva) {
      setIntentosFallidos(0); 
    }
  };

  let updatedInfo = null
  const handleChange = (fieldName, fieldValue) => {
    setInfo((prevInfo) => {
      updatedInfo = { ...prevInfo, [fieldName]: fieldValue }
      return updatedInfo
    });
    setErrors((prevErrors) => {
      return { ...prevErrors, [fieldName]: '' };
    });
  };

  useEffect(() => {
    get("/dominio-sena")
      .then((data) => {
        actualizarI(data);
      })
      .catch((error) => {
        console.error("Error al encontrar resultado", error);
      });
  }, []);

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

  const handleLoginClick = async () => {
    try{
      const camposObligatoriosLlenos = validarCamposObligatorios();

      if (!camposObligatoriosLlenos) {
        throw new Error("Completa todos los campos obligatorios.");
      }

      const InstitucionalEmailValid = valueI.map((item) => item.nombre);
      
      if (!InstitucionalEmailValid.some((domain) => info["correo_inst"].endsWith(domain))) {
        throw new Error("El correo electrónico institucional no es válido.");
      }

      const responde = await post('/registro/login', info)
      setErrorMensaje(null);
      realizarInicioSesion()

    } catch (error) {
      setOpen(true);
      setErrorMensaje(error.message);

      if(error.message === "ERROR: Credenciales invalidas"){
        setIntentosFallidos((prevIntentosFallidos) => prevIntentosFallidos + 1)

        if(intentosFallidos >= 2){
          setOpen(true)
          setTiempoRestante(300); 
          setErrorMensaje('Has excedido el límite de intentos fallidos. Intenta nuevamente en 5 minutos.')
          setLoginDeshabilitado(true);
          setCuentaRegresivaActiva(true);
          

          const contador = setInterval(() => {
            setTiempoRestante((prevTiempoRestante) => prevTiempoRestante - 1);
          }, 1000); 
          
          setTimeout(() => {
            clearInterval(contador);
            setCuentaRegresivaActiva(false);
            setIntentosFallidos(0);
            setOpen(false);
            setLoginDeshabilitado(false)
          }, 300000); 
        };
      };
    };
  };


  return (

    <div className='padree'>
      <div id="imagenes">
        <img src={miimagen} alt="sena-imagen" />
      </div>
      <div className='hijoo'>
        <div className='ones'></div>
        <div className='twos'></div>
        <div className='title items'> <h1>BIENVENIDO</h1> </div>

        <div className='items item-correo'>
          <InputCorreo
            label='Correo institucional'
            institutional
            onChange={(value) => handleChange('correo_inst', value)}
            required />
        </div>


        <div className='items contraseña-item'>
          <ContraseñaLogin
            onChange={(value) => handleChange('contrasena', value)}
            nombre='Contraseña'
            required />
        </div>

        <div className='items recuperarcuenta'>
          <Link to="/RecuperarContrasena" className="custom-link">¿Olvidaste tu contraseña?</Link>
        </div>
        <div className='items notcuenta'>
          <Link to="/Registro" className="custom-link">¿No tienes una cuenta? Regístrate</Link>
        </div>


        <div className='items inicio-s'>
          <Buttons
            nombre='Iniciar sesión'
            onclick={handleLoginClick}
            Disabled={loginDeshabilitado}  />
        </div>



      </div>
      <div className='item-casa'>
        <div className='casaa '>
          <Link to="/home" className='link'>
            <i class="bi bi-house-door-fill">
            </i><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" fill="currentColor" class="bi bi-house-door-fill" viewBox="0 0 16 16">
              <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
            </svg></Link>
        </div>
      </div>


      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={300000}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {errorMensaje === "Has excedido el límite de intentos fallidos. Intenta nuevamente en 5 minutos." ? (
              tiempoRestante >= 60 ? (`Has excedido el límite de intentos fallidos. Inténtalo de nuevo en ${Math.floor(tiempoRestante / 60)}:${(tiempoRestante % 60).toString().padStart(2, '0')} minutos`
              ) : (`Has excedido el límite de intentos fallidos. Inténtalo de nuevo en ${tiempoRestante} segundo${tiempoRestante !== 1 ? 's' : ''}`)
              ) : (errorMensaje || "Completa todos los campos obligatorios y de forma correcta!")}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
};