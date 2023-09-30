import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import miimagen from "../../pages/imagenes/sena-bienestar.png";
import { getParametre } from "../../UseFetch";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Buttons from "../../components/Buttons/Buttons";
import "./Autenticacion.css";
import { MuiOtpInput } from 'mui-one-time-password-input'

// Importa el componente MyComponent aquí
const MyComponent = () => {
  const [otp, setOtp] = React.useState('');

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  return (
    <MuiOtpInput className="MuiOtpInput-btn" value={otp} onChange={handleChange} length={6} />
  );
};

export default function Autenticacion() {
  const navegacion = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [activacionCompletada, setActivacionCompletada] = useState(false);

  const verificarEstadoUsuario = () => {
    getParametre("/registro/usuario/", userId)
      .then((userData) => {
        setUser(userData);
        console.log(userData.activacion);
        if (userData && userData.activacion === true) {
          setActivacionCompletada(true);
        }
      })
      .catch((error) => {
        console.error("Error al obtener la información del usuario:", error);
      });
  };

  useEffect(() => {
    verificarEstadoUsuario();

    if (!activacionCompletada) {
      const intervalId = setInterval(() => {
        verificarEstadoUsuario();
      }, 5000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [userId, activacionCompletada]);

  return (
    <div>
      <div className="father-conf">
        <figure>
          <img className="foto" src={miimagen} alt="sena-imagen" />
        </figure>
        <div className="father-conf-hijo">
          <h1>
            Revise su correo electrónico y confirme su dirección de correo
            electrónico
          </h1>
          {user ? (
            <>
              <p>Estimado usuario {user.nombres}</p>
              {activacionCompletada ? (
                <>
                  <h3>Su correo electrónico ha sido verificado con éxito.</h3>
                  <h3>
                    Ya puedes iniciar sesion con tu correo institucional y
                    contraseña
                  </h3>
                  <Buttons
                    className="boton-login"
                    nombre={"Login"}
                    onclick={() => navegacion("/Login")}
                  />
                </>
              ) : (
                <>
                  <h3>
                    Enviamos un codigo de confirmación a su correo
                    electrónico:
                  </h3>

                  <div className="botones-cod-confirmar">
                    <div className="small-buttons">
                      <MyComponent />
                    </div>
                    <div>
                      <br />
                      <a href="#">
                        <button className="btn-1">Confirmar codigo</button>
                      </a>
                    </div>
                  </div>
                  <p>{user.correo_inst}</p>
                  <h3>¿No puede encontrar el correo electrónico?</h3>
                  <p>
                    Puede que algunos correos tarden en recibirse. Compruebe su
                    carpeta de correos no deseados.
                  </p>
                  <a href="#">
                    <button className="btn-2">Reenviar correo electrónico</button>
                  </a>
                </>
              )}
            </>
          ) : (
            <p>Cargando la información del usuario...</p>
          )}
        </div>
      </div>
    </div>
  );
}
