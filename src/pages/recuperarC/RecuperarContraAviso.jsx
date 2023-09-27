import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import miimagen from "../../pages/imagenes/sena-bienestar.png";
import { useNavigate } from 'react-router-dom';



export default function RecuperacionContraAviso() {
const [cambioExitoso, setCambioExitoso] = useState(false);

  const navegacion = useNavigate();
  if (cambioExitoso) {
    navegacion('/RecuperacionContraAviso');
  }


  return (
    <div>
      <figure>
        <img className="foto" src={miimagen} alt="sena-imagen" />
      </figure>
      <div className="father-conf">
        <div>
          <h1>
            Cambio de contraseña exitoso
          </h1>
          <div>
          <Link to="/login">volver a iniciar secion</Link>
        </div>
        </div>
      </div>
    </div>
  );
}
