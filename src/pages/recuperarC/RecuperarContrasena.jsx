import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InputCorreo from "../../components/ComantCorreo/ComantCorreo";
import ButtonContraseña from "../../components/ButtonContraseña/ButtonContraseña";
import Textfield from "../../components/Textfield/Textfield";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { forwardRef } from "react";
import get, { post } from "../../UseFetch";
import Dialogs from "../../components/Dialog/Dialog";
import "./RecuperarContrasena.css";

export default function RecuperarContrasena() {
  const [correo, setCorreo] = useState("");
  const [codigo, setCodigo] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [valueI, actualizarI] = useState([]);
  const [errorMensaje, setErrorMensaje] = useState("");
  const [envioExitoso, setEnvioExitoso] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const nextSlide = () => {
    if (currentSlide < 2) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleChange = (fieldName, fieldValue) => {
    if (fieldName === "correo") {
      setCorreo(fieldValue);
    } else if (fieldName === "codigo") {
      setCodigo(fieldValue);
    } else if (fieldName === "newPassword") {
      setNewPassword(fieldValue);
    }
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

  const handleEnviarCorreo = async () => {
    if (!correo) {
      setErrorMensaje("El campo de correo electronico es obligatorio.");
      setOpen(true);
      return;
    }

    const InstitucionalEmailValid = valueI.map((item) => item.nombre);

    if (!InstitucionalEmailValid.some((domain) => correo.endsWith(domain))) {
      setErrorMensaje(
        "Correo no válido. Ingrese correctamente su correo institucional."
      );
      setOpen(true);
      return;
    }

    try {
      console.log(correo);
      const response = await post("/registro/rest", { correo });
      console.log("Respuesta del backend:", response);

      if (response && response.message === "Correo enviado") {
        setEnvioExitoso(true);
      } else {
        console.log("Envío del código exitoso.");
      }
    } catch (error) {
      console.error("Error en la solicitud POST:", error);
      setErrorMensaje(error.message);
      setOpen(true);
    }
  };

  const handleCambiarContrasena = async () => {
    if (!correo || !codigo || !newPassword) {
      setErrorMensaje(
        "Debes completar todos los campos antes de cambiar la contraseña."
      );
      setOpen(true);
      return;
    }
    const data = { correo, codigo, newPassword };
    try {
      const response = await post("/registro/rest/password", data);
      console.log("Contraseña cambiada exitosamente");
      setDialogMessage(
        "Estimado usuario, se ha realizado el cambio de su contraseña, ahora puede acceder nuevamente a su cuenta."
      );
      setDialogOpen(true);
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setErrorMensaje(error.message);
      setOpen(true);
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
      <div className="tittlee">
        <h1 className="titulo-rec">Recupera tu contraseña</h1>
      </div>




      <ul className="sldrr">


        <li className={currentSlide === 0 ? "active" : "inactive"} id="slidee1 " >

          <div className="son">  
       
              <InputCorreo
                label="Correo institucional"
                institutional
                onChange={(value) => handleChange("correo", value)}
                required
                error={errors.correo_inst}
              />
          
          </div>

          <button className="btn-env-correo son" onClick={handleEnviarCorreo}>
            Enviar Codigo
          </button>
        </li>


        

        <li className={currentSlide === 1 ? "active" : "inactive"} id="slidee2 idd">
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
              onChange={(value) => handleChange("newPassword", value)}
              required
              error={errors.contrasena}
            />
          </div>
          <div className="item btn-rcontra-one">
            <button className="btn-rcontra" onClick={handleCambiarContrasena}>
              Recuperar Contraseña
            </button>
          </div>
        </li>
      </ul>
      <div className="next">
      <button
        className="btn-siguiente"
        disabled={currentSlide === 0}
        onClick={() => setCurrentSlide(currentSlide - 1)}
      >
        Anterior
      </button>
      <button className="btn-siguiente" onClick={nextSlide}>
        Siguiente
      </button>

      <div className="item item-link">
        <Link className="custom-link link-inicio" to="/login">
          Volver al inicio de sesión
        </Link>
      </div>


      </div>
     

      <Dialogs
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        titulo="¡La contraseña se ha cambiado con éxito!"
        contenido={dialogMessage}
        onSave={() => setDialogOpen(false)}
        redirectTo="login"
      />
  <div>
  <Stack spacing={2} sx={{ }}>
        {envioExitoso && (
          <Alert
            onClose={() => setEnvioExitoso(false)}
            severity="success"
            sx={{ }}
          >
            El código se ha enviado exitosamente, por favor revise su correo
            electrónico
          </Alert>
        )}
        {errorMensaje && (
          <Alert
            onClose={() => setErrorMensaje("")}
            severity="error"
            sx={{ }}
          >
            {errorMensaje}
          </Alert>
        )}
      </Stack>

  </div>
      
    </div>
  );
}
