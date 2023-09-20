import ComSelect from "../components/ComSelect/ComSelect.jsx";
import AutoComplete from "../components/AutoComplete/AutoComplete.jsx";
import Textfield from "../components/Textfield/Textfield.jsx";
import ModalTyC from "../components/ModalTyC/ModalTyC.jsx";
import Buttons from "../components/Buttons/Buttons.jsx";
import Date from "../components/Date/Date.jsx";
import { Link } from "react-router-dom";
import ButtonContraseña from "../components/ButtonContraseña/ButtonContraseña.jsx";
import InputCorreo from "../components/ComantCorreo/ComantCorreo.jsx";
import "./registro.css";
import { useState, useEffect } from "react";
import get, { post } from "../UseFetch.js";
import miimagen from "../pages/imagenes/sena-bienestar.png";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { forwardRef } from "react";

export default function Registro() {
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

  const realizarRegistro = () => {
    post("/registro", info);
    console.log("Registro exitoso", info);
  };

  const handleRegistroClick = () => {
    const camposObligatoriosLlenos = validarCamposObligatorios();
    const InstitucionalEmailValid = valueI.map((item) => item.nombre);
    const telefonoRegex = /^\+?(?:\d{1,3}[-\s])?\d{10,14}$/;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&+.])[A-Za-z\d$@$!%*?&+.]{8,20}$/;
    if (
      aceptoTerminos &&
      camposObligatoriosLlenos &&
      InstitucionalEmailValid.some((domain) =>
        info["correo_inst"].endsWith(domain)
      ) &&
      telefonoRegex.test(info["telefono"]) &&
      passwordPattern.test(info["contrasena"])
    ) {
      info["pps"] = true;

      realizarRegistro();
    } else {
      info["pps"] = false;
      setOpen(true);
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
        <h1 className="tittle">REGISTRATE</h1>

        <ul className="slider">
          <li id="slide1">
            <div className="contenedor uno">
              <div className="item">
                <Textfield
                  name="Nombres"
                  onChange={(value) => handleChange("nombres", value)}
                  required
                />
              </div>

              <div className="item">
                <Textfield
                  name="Apellidos"
                  onChange={(value) => handleChange("apellidos", value)}
                  required
                />
              </div>

              <div className="item">
                <ComSelect
                  nombre="Tipo de documento"
                  items={["C.C", "T.I", "P.A", "C.E"]}
                  onChange={(value) => handleChange("tipo_doc", value)}
                  required
                />
              </div>

              <div className="item">
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

              <div className="item">
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

              <div className="item">
                <Textfield
                  name="Teléfono"
                  onChange={(value) => handleChange("telefono", value)}
                  required
                />
              </div>

              <div className="item">
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

              <div className="item">
                <ComSelect
                  nombre="Tipo de Sangre"
                  items={["A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"]}
                  onChange={(value) => handleChange("rh", value)}
                />
              </div>

              <div className="item">
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
              <div className="item">
                <InputCorreo
                  label="Correo institucional"
                  institutional
                  onChange={(value) => handleChange("correo_inst", value)}
                  required
                />
              </div>

              <div className="item">
                <InputCorreo
                  label="Correo personal"
                  onChange={(value) => handleChange("correo_pers", value)}
                />
              </div>

              <div className="item">
                <ButtonContraseña
                  nombre={"contraseña"}
                  onChange={(value) => handleChange("contrasena", value)}
                  required
                />
              </div>

              <Stack spacing={2} sx={{ width: "100%" }}>
                <Snackbar
                  open={open}
                  autoHideDuration={6000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: "100%" }}
                  >
                    Completa todos los campos obligatorios y de forma correcta!
                  </Alert>
                </Snackbar>
              </Stack>

              <div className="item-TyC">
                <ModalTyC
                  nombre="Términos y condiciones"
                  texto={
                    <div className="texto-derecha">
                      <p className="titulo-TyC">1. Aceptación de los Términos y Condiciones</p>
                      <p>1.1. Al utilizar la aplicación BiSport y los servicios relacionados, usted acepta cumplir y estar sujeto a los términos y condiciones establecidos en este Acuerdo.</p>
                      <p className="titulo-TyC">2. Servicios</p>
                      <p>2.1. BiSport permite a los usuarios administrar, prestar y solicitar implementos deportivos.</p>
                      <p>2.2. Usted reconoce y acepta que BiSport puede recopilar y almacenar información personal, incluyendo, pero no limitado a, nombre, dirección, número de teléfono, dirección de correo electrónico y otra información relevante para el servicio.</p>
                      <p className="titulo-TyC">3. Uso Adecuado</p>
                      <p>3.1. Usted se compromete a utilizar la aplicación BiSport y sus servicios de manera ética y legal.</p>
                      <p>3.2. Usted no debe utilizar la aplicación BiSport para:</p>
                      <p>a. Realizar actividades ilegales o fraudulentas.</p>
                      <p>b. Difamar, acosar o violar los derechos de privacidad de otros usuarios.</p>
                      <p>c. Proporcionar información falsa o engañosa.</p>
                      <p className="titulo-TyC">4. Privacidad de los Datos</p>
                      <p>4.1. La recopilación y el uso de sus datos personales están sujetos a nuestra Política de Privacidad. Esta política explica cómo se recopilan, almacenan y utilizan los datos personales de los usuarios, así como los derechos de los usuarios sobre sus datos.</p>
                      <p>4.2. Al aceptar estos términos y condiciones, usted también acepta nuestra Política de Privacidad.</p>
                      <p className="titulo-TyC">5. Opción de Aceptación de Términos y Condiciones</p>
                      <p>5.1. Antes de utilizar la aplicación BiSport, los usuarios tendrán la opción de aceptar o rechazar estos Términos y Condiciones y la Política de Privacidad. El uso continuado de la aplicación después de la aceptación se considerará como un acuerdo a estos términos.</p>
                      <p className="titulo-TyC">6. Responsabilidad</p>
                      <p>6.1. BiSport no asume responsabilidad por la pérdida, daño o robo de los implementos deportivos prestados o solicitados a través de la plataforma.</p>
                      <p className="titulo-TyC">7. Modificaciones y Terminación</p>
                      <p>7.1. BiSport se reserva el derecho de modificar, suspender o terminar la aplicación y sus servicios en cualquier momento, por cualquier motivo y sin previo aviso.</p>
                      <p className="titulo-TyC">8. Ley Aplicable y Jurisdicción</p>
                      <p>8.1. Este Acuerdo se rige por las leyes de Colombia. Cualquier disputa relacionada con este Acuerdo estará sujeta a la jurisdicción exclusiva de los tribunales de Montería.</p>
                      <p className="titulo-TyC">9. Contacto</p>
                      <p>9.1.  Para ponerse en contacto con BiSport con respecto a este Acuerdo o cualquier otro asunto, utilice la siguiente información de contacto: [Correo Electrónico de Soporte] o [Número de Teléfono de Soporte de BiSport].</p>
                      <p className="titulo-TyC">10. Aceptación</p>
                      <p>10.1. Al utilizar la aplicación BiSport, usted reconoce que ha leído, comprendido y aceptado los términos y condiciones de este Acuerdo y la Política de Privacidad.</p>
                    </div>
                  }
                  onChange={handleAceptoTerminosChange}
                />
              </div>

              <div className="item">
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
            <a href="#slide1">1</a>
            <a href="#slide2">2</a>
            <a href="#slide3">3</a>
          </li>
        </ul>
      </form>
      <div id="home">
        <Link to="/home">Home</Link>
      </div>
    </div>
  );
}
