import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import miimagen from "../../pages/imagenes/sena-bienestar.png";
import { useNavigate } from 'react-router-dom';
import './RecuperarContraAviso.css';



export default function RecuperacionContraAviso() {
  const [cambioExitoso, setCambioExitoso] = useState(false);

  const navegacion = useNavigate();
  if (cambioExitoso) {
    navegacion('/RecuperacionContraAviso');
  }


  return (
    <div className="contenedor-padre">
      <figure>
        <img className="foto-recontra" src={miimagen} alt="sena-imagen" />
      </figure>
      <div className="contenedor-info-recontra">
        <div>
          <h1>
            Cambio de contraseña exitoso
          </h1>
          <div>
            <p className="texto-contra-re">
              <b>
                Estimado usuario. 
                <br />
                <br />
                !Su contraseña ha sido cambiada con éxito¡ 
                <br />
                Haz clic en el siguiente enlace: <Link className="custom-link" to="/login">Iniciar sesion</Link>, para acceder a tú cuenta.
                <br />
                <br />
                ¡Bienvenido de vuelta!
              </b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
