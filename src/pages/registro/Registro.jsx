import ComSelect from "../../components/ComSelect/ComSelect.jsx";
import AutoComplete from "../../components/AutoComplete/AutoComplete.jsx";
import Textfield from "../../components/Textfield/Textfield.jsx";
import ModalTyC from "../../components/ModalTyC/ModalTyC.jsx";
import Buttons from "../../components/Buttons/Buttons.jsx";
import Date from "../../components/Date/Date.jsx";
import { Link, useNavigate } from "react-router-dom";
import ButtonContraseña from "../../components/ButtonContraseña/ButtonContraseña.jsx";
import InputCorreo from "../../components/ComantCorreo/ComantCorreo.jsx";
import "./Registro.css";
import { useState, useEffect } from "react";
import get, { getParametre, post } from "../../UseFetch.js";
import miimagen from "../../pages/imagenes/sena-bienestar.png";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { forwardRef } from "react";

export default function Registro() {
  const navegacion = useNavigate();
  const [info, setInfo] = useState({});
  const [errors, setErrors] = useState({});
  const [jsonData, setJsonData] = useState(null);
  const [fichas, setFichas] = useState([]);
  const [selectedFichaId, setSelectedFichaId] = useState(null);
  const [eps, setEps] = useState([]);
  const [selectedEpsId, setSelecteEpsId] = useState(null);
  const [datosListos, setDatosListos] = useState(false);
  const [rol, setRol] = useState([]);
  const [selectRolId, setSelectRolId] = useState(null);
  const [aceptoTerminos, setAceptoTerminos] = useState(false);
  const [open, setOpen] = useState(false);
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const [valueI, actualizarI] = useState([]);
  const [errorMensaje, setErrorMensaje] = useState(null);
  const [correoValido, setCorreoValido] = useState(true);
  const [correoInstitucional, setCorreoInstitucional] = useState(false);
  //Estilos para el slider en el cual se encuentra el usuario
  const [activeSliderIndex, setActiveSliderIndex] = useState(0);
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);

  const handleMenuClick = (index) => {
    setActiveSliderIndex(index);
    setActiveMenuIndex(index);
  };

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleAceptoTerminosChange = (value) => {
    setAceptoTerminos(value);
  };

  let updatedInfo = null;
  const handleChange = (fieldName, fieldValue) => {
    setInfo((prevInfo) => {
      updatedInfo = { ...prevInfo, [fieldName]: fieldValue };
      return updatedInfo;
    });
    setErrors((prevErrors) => {
      return { ...prevErrors, [fieldName]: "" };
    });
  };

  const validarCamposObligatorios = () => {
    const camposObligatorios = [
      "nombres",
      "apellidos",
      "tipo_doc",
      "n_doc",
      "telefono",
      "correo_inst",
      "rol",
      "genero",
      "contrasena",
      "direccion",
    ];
    const errores = {};

    camposObligatorios.forEach((campo) => {
      if (!info[campo] || info[campo] === false) {
        errores[campo] = "Este campo es obligatorio.";
      }
    });

    setErrors(errores);
    return Object.keys(errores).length === 0;
  };

  const handleRegistroClick = async () => {
    try {
      const camposObligatoriosLlenos = validarCamposObligatorios();

      if (!aceptoTerminos) {
        throw new Error("Debes aceptar los términos y condiciones.");
      }

      if (!camposObligatoriosLlenos) {
        throw new Error("Completa todos los campos obligatorios.");
      }

      const InstitucionalEmailValid = valueI.map((item) => item.nombre);
      const telefonoRegex = /^\+?(?:\d{1,3}[-\s])?\d{10,14}$/;
      const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&+.])[A-Za-z\d$@$!%*?&+.]{8,20}$/;

      

      if (!telefonoRegex.test(info["telefono"])) {
        throw new Error("El número de teléfono no es válido.");
      }

      if (!passwordPattern.test(info["contrasena"])) {
        throw new Error("La contraseña no cumple con los requisitos.");
      }

      info["pps"] = true;
      const response = await post("/registro", info);
      const idNewUser = await getParametre(
        `/registro/usuario/findByMail/`,
        info["correo_inst"]
      );

      localStorage.setItem("token", idNewUser.token);
      navegacion(`/auth`);
      setRegistroExitoso(true);
      setCorreoValido(true);
      setErrorMensaje(null);
    } catch (error) {
      setRegistroExitoso(false);
      setCorreoValido(false);
      setOpen(true);
      setErrorMensaje(error.message);
    }
  };

  useEffect(() => {
    if (fichas.length > 0 && eps.length > 0 && rol.length > 0) {
      setDatosListos(true);
    }
  }, [fichas, eps, rol]);
  //! DOMINIO

  useEffect(() => {
    get("/dominio-sena")
      .then((data) => {
        actualizarI(data);
      })
      .catch((error) => {
        console.error("Error al encontrar resultado", error);
      });
  }, []);

  //! FIN DOMIN IO

  //! ROL
  useEffect(() => {
    get("/rol")
      .then((data) => {
        setRol(data);
      })
      .catch((error) => {
        console.error("Error al encontrart el resultado", error);
      });
  }, []);

  const handleRolFormSubmit = (selectRolvalue) => {
    const selectRolOption = rolOption.find(
      (option) => option.label === selectRolvalue
    );
    if (selectRolOption) {
      const selectRolId = selectRolOption.value;
      const updatedInfo = { ...info, rol: selectRolId };
      setInfo(updatedInfo);
    }
  };

  const rolOption = rol.map((rol) => ({
    label: rol.nombre,
    value: rol["_id"],
  }));

  //! FIN ROL

  //! FICHA
  useEffect(() => {
    get("/ficha")
      .then((data) => {
        setFichas(data);
      })
      .catch((error) => {
        console.error("Error al encontrar resultado", error);
      });
  }, []);

  const handleFichaFormSubmit = (selectedFichaValue) => {
    const selectedFichaOption = fichasOptions.find(
      (option) => option.label === selectedFichaValue
    );

    if (selectedFichaOption) {
      const selectedFichaId = selectedFichaOption.value;
      const updatedInfo = { ...info, ficha: selectedFichaId };
      setInfo(updatedInfo);
      setSelectedFichaId(selectedFichaId);
      console.log(updatedInfo);
    }
  };

  const fichasOptions = fichas.map((ficha) => ({
    label: ficha.codigo,
    value: ficha["_id"],
  }));
  //! FIN FICHA

  //! EPS
  useEffect(() => {
    get("/eps")
      .then((data) => {
        setEps(data);
      })
      .catch((error) => {
        console.error("Error al encontrar resultados de EPS", error);
      });
  }, []);

  const handleEpsFormSubmit = (selectedEpsValue) => {
    const selectedEpsOption = epsOptions.find(
      (option) => option.label === selectedEpsValue
    );

    if (selectedEpsOption) {
      const selectedEpsId = selectedEpsOption.value;
      const updatedInfo = { ...info, eps: selectedEpsId };
      setInfo(updatedInfo);
      setSelecteEpsId(selectedEpsId);
      console.log(updatedInfo);
    }
  };

  const epsOptions = eps.map((eps) => ({
    label: eps.nombre,
    value: eps["_id"],
  }));

  //! FIN EPS

  return (
    <div className="father">
      <div id="imagenes">
        <img src={miimagen} alt="sena-imagen" />
      </div>
      <div className="child"></div>
      <div className="child-two"></div>
      <form className="form">
        <div className="title">
          <h1>REGISTRATE</h1>
        </div>
        <ul className="slider">
          <li id="slide1">
            <div className="contenedor uno">
              <div className="item item-nom">
                <Textfield
                  name="Nombres"
                  onChange={(value) => handleChange("nombres", value)}
                  required
                />
              </div>
              <div className="item item-ape">
                <Textfield
                  name="Apellidos"
                  onChange={(value) => handleChange("apellidos", value)}
                  required
                />
              </div>
              <div className="item item-TD">
                <ComSelect
                  nombre="Tipo de documento"
                  items={["C.C", "T.I", "P.A", "C.E"]}
                  onChange={(value) => handleChange("tipo_doc", value)}
                  required
                />
              </div>
              <div className="item item-documento">
                <Textfield
                  name="Número de documento"
                  onChange={(value) => handleChange("n_doc", value)}
                  required
                />
              </div>
              <div className="item item-fecha">
                <Date
                  Descripcion="Fecha de Nacimiento"
                  onChange={(value) => handleChange("nacimiento", value)}
                />
              </div>
              <div className="item item-rol">
                <ComSelect
                  nombre="Rol"
                  items={rolOption.map((opcion) => opcion.label)}
                  onChange={(value) => handleRolFormSubmit(value)}
                  getOptionLabel={(option) => option.label}
                  value={setSelectRolId}
                  required
                />
              </div>
            </div>
          </li>
          <li id="slide2">
            <div className="contenedor dos">
              <div className="item item-ficha">
                <AutoComplete
                  nombre="Ficha"
                  array={fichasOptions}
                  onChange={(value) => handleFichaFormSubmit(value)}
                  getOptionLabel={(option) => option.label}
                  value={setSelectedFichaId}
                />
              </div>
              <div className="item item-tel">
                <Textfield
                  name="Teléfono"
                  onChange={(value) => handleChange("telefono", value)}
                  required
                />
              </div>
              <div className="item item-dir">
                <Textfield
                  name="Dirección"
                  onChange={(value) => handleChange("direccion", value)}
                  required
                />
              </div>
              <div className="item item-eps">
                <AutoComplete
                  nombre="EPS"
                  array={epsOptions}
                  onChange={(value) => handleEpsFormSubmit(value)}
                  getOptionLabel={(option) => option.label}
                  value={setSelecteEpsId}
                />
              </div>
              <div className="item item-TS">
                <ComSelect
                  nombre="Tipo de Sangre"
                  items={["A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"]}
                  onChange={(value) => handleChange("rh", value)}
                />
              </div>
              <div className="item item-gen">
                <ComSelect
                  nombre="Género"
                  items={["Masculino", "Femenino", "Otro"]}
                  onChange={(value) => handleChange("genero", value)}
                  required
                />
              </div>
            </div>
          </li>
          <li id="slide3">
            <div className="contenedor tres">
              <div className="item slr1">
                <InputCorreo
                  label="Correo institucional"
                  institutional
                  onChange={(value) => {
                    handleChange("correo_inst", value);
                    setCorreoInstitucional(value);
                  }}
                  required
                />
              </div>
              <div className="item slr1">
                <InputCorreo
                  label="Correo personal"
                  onChange={(value) => handleChange("correo_pers", value)}
                />
              </div>
              <div className="item slr1 item-contra">
                <ButtonContraseña
                  nombre={"contraseña"}
                  onChange={(value) => handleChange("contrasena", value)}
                  required
                />
              </div>
              <Stack>
                <Snackbar
                  className="Snackbar-contraseña"
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: "100%" }}
                  >
                    {errorMensaje ||
                      "Completa todos los campos obligatorios y de forma correcta!"}
                  </Alert>
                </Snackbar>
              </Stack>
              <div className="item-TyC slr1 item">
                <ModalTyC
                  //Utilizo la etiqueta p para los saltos de linea.
                  nombre="Términos y condiciones"
                  texto={
                    <div className="texto-derecha">
                      <p className="titulo-TyC first-titulo">
                        Términos y Condiciones
                      </p>
                      <p>
                        1.1. Al utilizar la aplicación BiSport y los servicios
                        relacionados, usted acepta cumplir y estar sujeto a los
                        términos y condiciones establecidos en este Acuerdo.
                      </p>
                      <p className="titulo-TyC">2. Servicios</p>
                      <p>
                        2.1. BiSport permite a los usuarios administrar, prestar
                        y solicitar implementos deportivos.
                      </p>
                      <p>
                        2.2. Usted reconoce y acepta que BiSport puede recopilar
                        y almacenar información personal, incluyendo, pero no
                        limitado a, nombre, dirección, número de teléfono,
                        dirección de correo electrónico y otra información
                        relevante para el servicio.
                      </p>
                      <p className="titulo-TyC">3. Uso Adecuado</p>
                      <p>
                        3.1. Usted se compromete a utilizar la aplicación
                        BiSport y sus servicios de manera ética y legal.
                      </p>
                      <p>
                        3.2. Usted no debe utilizar la aplicación BiSport para:
                      </p>
                      <p>a. Realizar actividades ilegales o fraudulentas.</p>
                      <p>
                        b. Difamar, acosar o violar los derechos de privacidad
                        de otros usuarios.
                      </p>
                      <p>c. Proporcionar información falsa o engañosa.</p>
                      <p className="titulo-TyC">4. Privacidad de los Datos</p>
                      <p>
                        4.1. La recopilación y el uso de sus datos personales
                        están sujetos a nuestra Política de Privacidad. Esta
                        política explica cómo se recopilan, almacenan y utilizan
                        los datos personales de los usuarios, así como los
                        derechos de los usuarios sobre sus datos.
                      </p>
                      <p>
                        4.2. Al aceptar estos términos y condiciones, usted
                        también acepta nuestra Política de Privacidad.
                      </p>
                      <p className="titulo-TyC">
                        5. Opción de Aceptación de Términos y Condiciones
                      </p>
                      <p>
                        5.1. Antes de utilizar la aplicación BiSport, los
                        usuarios tendrán la opción de aceptar o rechazar estos
                        Términos y Condiciones y la Política de Privacidad. El
                        uso continuado de la aplicación después de la aceptación
                        se considerará como un acuerdo a estos términos.
                      </p>
                      <p className="titulo-TyC">6. Responsabilidad</p>
                      <p>
                        6.1. BiSport no asume responsabilidad por la pérdida,
                        daño o robo de los implementos deportivos prestados o
                        solicitados a través de la plataforma.
                      </p>
                      <p className="titulo-TyC">
                        7. Modificaciones y Terminación
                      </p>
                      <p>
                        7.1. BiSport se reserva el derecho de modificar,
                        suspender o terminar la aplicación y sus servicios en
                        cualquier momento, por cualquier motivo y sin previo
                        aviso.
                      </p>
                      <p className="titulo-TyC">
                        8. Ley Aplicable y Jurisdicción
                      </p>
                      <p>
                        8.1. Este Acuerdo se rige por las leyes de Colombia.
                        Cualquier disputa relacionada con este Acuerdo estará
                        sujeta a la jurisdicción exclusiva de los tribunales de
                        Montería.
                      </p>
                      <p className="titulo-TyC">9. Contacto</p>
                      <p>
                        9.1. Para ponerse en contacto con BiSport con respecto a
                        este Acuerdo o cualquier otro asunto, utilice la
                        siguiente información de contacto: [Correo Electrónico
                        de Soporte] o [Número de Teléfono de Soporte de
                        BiSport].
                      </p>
                      <p className="titulo-TyC">10. Aceptación</p>
                      <p>
                        10.1. Al utilizar la aplicación BiSport, usted reconoce
                        que ha leído, comprendido y aceptado los términos y
                        condiciones de este Acuerdo y la Política de Privacidad.
                      </p>
                    </div>
                  }
                  onChange={handleAceptoTerminosChange}
                />
              </div>

              <div className="item registro-s slr1">
                <Buttons
                  nombre="Registrarse"
                  onclick={handleRegistroClick}
                  disabled={!aceptoTerminos}
                />
              </div>
            </div>
          </li>
        </ul>
        <ul className="menu">
          <li>
            <a
              href="#slide1"
              className={activeMenuIndex === 0 ? "active" : ""}
              onClick={() => handleMenuClick(0)}
            >
              1
            </a>
            <a
              href="#slide2"
              className={activeMenuIndex === 1 ? "active" : ""}
              onClick={() => handleMenuClick(1)}
            >
              2
            </a>
            <a
              href="#slide3"
              className={activeMenuIndex === 2 ? "active" : ""}
              onClick={() => handleMenuClick(2)}
            >
              3
            </a>
          </li>
        </ul>
      </form>
      <div className="item-casaa">
        <div className="casaaa">
          <Link to="/home" className="linkk">
            <i className="bi bi-house-door-fill"></i>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="17"
              fill="currentColor"
              className="bi bi-house-door-fill"
              viewBox="0 0 16 16"
            >
              <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5Z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
