import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import miimagen from "../../pages/imagenes/sena-bienestar.png";
import { getParametre, post } from "../../UseFetch";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import Buttons from "../../components/Buttons/Buttons";
import "./Autenticacion.css";
import { MuiOtpInput } from "mui-one-time-password-input";
import OtpInput from "../../components/OtpInput/otpInput";
import jwt_decode from "jwt-decode";

export default function Autenticacion() {
  const navegacion = useNavigate();
  const [user, setUser] = useState(null);
  const [activacionCompletada, setActivacionCompletada] = useState(false);
  const userToken = localStorage.getItem("token")
  const decodeToken = jwt_decode(userToken)
  const verificarEstadoUsuario = () => {
    getParametre("/registro/usuario/findByMail/", decodeToken.correo_inst)
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
  }, [activacionCompletada]);

  const handleOtpChange = (otp) => {
    if (otp.trim() !== "") {
      setUser(otp);
    }
  };
  const handleRegistroClick = async () => {
    try {
      console.log(decodeToken.codigo)
      const response = await post("/registro/auth", {codigo: user } );
      window.location.reload();
    } catch (error) {
      console.error("Error en la solicitud POST:", error);
    }
  };

  return (
    <div>
      <div className="father-conf">
        <figure>
          <img className="foto" src={miimagen} alt="sena-imagen" />
        </figure>
        <div className="father-conf-hijo">
          <h1>
            Revise su correo y confirme su registro
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
                  <button
                    className="btn-conf-co"
                    onClick={() => navegacion("/Login")}
                  >
                    Login
                  </button>
                </>
              ) : (
                <>
                  <h3>
                    Enviamos un codigo de confirmación a su correo electrónico:
                  </h3>

                  <div className="botones-cod-confirmar">
                    <div className="small-buttons">
                      <OtpInput
                        className="MuiOtpInput-btn"
                        length={6}
                        onChange={handleOtpChange}
                      ></OtpInput>
                    </div>
                    <div>
                      <br />
                      <a href="#">
                        <button className="btn-1" onClick={handleRegistroClick}>
                          Confirmar codigo
                        </button>
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
                    <button className="btn-2">
                      Reenviar correo electrónico
                    </button>
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
