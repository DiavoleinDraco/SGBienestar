import React, { useState, useEffect, lazy } from "react";
const Menu = lazy(() => import("../../../components/menu/Menu"));

import Box from "@mui/material/Box";
import Textfield from "../../../components/Textfield/Textfield";
import ComSelect from "../../../components/ComSelect/ComSelect";
import "./Informes.css";
import Date from "../../../components/Date/Date";
import NavTabs from "../../../components/NavTabs/NavTabs";
import Buttons from "../../../components/Buttons/Buttons";
import BasicAccordion from "../../../components/BasicAccordion/BasicAccordion";
import get, { getMultipleParametre, post } from "../../../UseFetch";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import jwtDecode from "jwt-decode";
import TablaInformes from "../../../components/Historial_Informes/Historial_Informes";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Informes() {
  const [estado, setEstado] = useState([]);
  const [additionalInfoCount, setAdditionalInfoCount] = useState(1);
  const [selectedEstado, setSelectedEstado] = useState(null);
  const [opcionesComSelect, setOpcionesComSelect] = useState([]);
  const [open, setOpen] = useState(true);
  const [openSnack, setOpenSanck] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [tipo, setTipo] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const almacenar = jwtDecode(token);
  const [response, setDataResponse] = useState({});
  const [enviado, setEnviado] = useState(false);
  const [DataUsuario, setData] = useState("");
  const [matchedUserId, setMatchedUserId] = useState(null);
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [implemento, setImplemento] = useState([]);
  const [showHistorial, setShowHistorial] = useState(false);

  const [informeData, setInformeData] = useState({
    tipo_informe: "",
    usuario: almacenar.id,
    dependencia: "Bienestar",
    implemento: [],
    estado_implemento: [""],
    estado: "",
    usuarios: [""],
    observaciones: "",
  });

  const agregarImplemento = () => {
    const nuevoImplemento = {
      nombre: "",
      cantidad: 0,
      caracteristicas: "",
    };
    setImplemento([...implemento, nuevoImplemento]);
  };

  console.log(almacenar);
  console.log(matchedUserId);
  {
    /*//!Peticiones */
  }
  useEffect(() => {
    get("/estado-implemento")
      .then((data) => {
        setEstado(data);
        console.log("Estados: ", data);
      })
      .catch((error) => {
        console.error("Error al encontrart el resultado", error);
      });
  }, []);

  useEffect(() => {
    get("/tipo-informe")
      .then((data) => {
        setTipo(data);
        console.log("data de tipo: ", data);
        if (data.length > 0) {
          setInformeData({
            ...informeData,
            tipo_informe: data[0]._id,
          });
        }
      })
      .catch((error) => {
        console.error("Error al encontrart el resultado", error);
      });
  }, []);

  const nombrecompleto = almacenar.nombre + " " + almacenar.apellidos;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    try {
      setOpen(true);

      if (selectedOption && selectedOption.label === "Historial de Informes") {
        setShowHistorial(true);
      }
    } catch (error) {
      console.error("Error in handleClose:", error);
    }
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSanck(false);
  };

  console.log("informedata", informeData);

  const handleTipoInformeFormit = (selectedTipo) => {
    const selectedTipoInformeOption = selectedTipoInfo.find(
      (option) => option.label === selectedTipo
    );

    if (selectedTipoInformeOption) {
      const selectedInfoTipo = selectedTipoInformeOption.value;

      setSelectedOption(selectedTipoInformeOption);
      const updateInfo = {
        ...informeData,
        tipo_informe: selectedInfoTipo,
      };
      setInformeData(updateInfo);

      setShowHistorial(false);
      setOpen(false);
    }
  };

  const selectedTipoInfo = tipo.map((tipo) => ({
    label: tipo.nombre,
    value: tipo["_id"],
  }));

  //__________________USUARIO_______________________________

  const encabezadoImplemento = () => (
    <div className="container-Informes">
      <div className="contenedorsito">
        <div className="cont-funcionario">
          <p style={{ display: "inline-block" }}>
            Nombre del Funcionario:
          </p>
          <input
            style={{
              padding: "10px",
              border: "1px solid #2c0757",
              borderRadius: "4px",
              boxSizing: "border-box",
              width: "250px", // Ajusta el ancho según sea necesario
              outline: "none", // Elimina el contorno al enfocar
              borderColor: "#2c0757", // Cambia el color del borde al enfocar el input
            }}
            className="input-name-fun"
            name=""
            value={nombrecompleto}
            onChange={(event) =>
              handleInformeDataChange("nombreFuncionario", event.target.value)
            }
          />
        </div>
      </div>
      <div className="contenedor-dependencia">
        <Textfield
          inicial="Bienestar"
          name="Dependencia"
          onChange={(value) =>
            handleInformeDataChange("dependencia", event.target.value)
          }
        />
      </div>

      <div className="cont-observacion">
        <p>Observaciones</p>
        <TextField
          style={{
            Height: '60%',
            width: "100%",
            overflowY: 'auto',// Muestra una barra de desplazamiento vertical si es necesario
          }}

          multiline
          name=""
          onChange={(event) =>
            handleInformeDataChange("observaciones", event.target.value)
          }
        />
      </div>
    </div>
  );

  /*
  TRAE A TODOS LOS USUARIOS
  
  */

  useEffect(() => {
    get("/registro/info")
      .then((usuarios) => {
        console.log("Hola", usuarios);
        const dataUsuarios = usuarios.map((user) => ({
          id: user._id,
          numDoc: user.n_doc,
        }));
        setData(dataUsuarios);
        console.log("datos usuarios", dataUsuarios);

        const matchedUser = dataUsuarios.find(
          (user) => user.numDoc === numeroDocumento
        );
        if (matchedUser) {
          setMatchedUserId(matchedUser.id);
        }
        console.log(matchedUser)
        setInformeData({
          ...informeData,
          usuarios: [matchedUser.id],
        });
      })
      .catch((usuarioError) => {
        console.error("Error al cargar el usuario", usuarioError);
      });
  }, [numeroDocumento]);

  const handleInformeDataChange = (fieldName, value, index, subfield) => {
    if (fieldName === "infoAdicional") {
      const updatedInfoAdicional = [...informeData.infoAdicional];
      if (!updatedInfoAdicional[index]) {
        updatedInfoAdicional[index] = {};
      }
      if (subfield) {
        updatedInfoAdicional[index] = {
          ...updatedInfoAdicional[index],
          [subfield]: value,
        };
      }
      setInformeData({
        ...informeData,
        infoAdicional: updatedInfoAdicional,
      });
    } else if (fieldName === "estado_implemento") {
      setInformeData({
        ...informeData,
        [fieldName]: value,
      });
    } else if (fieldName === "usuarios") {
      const updatedUsuarios = [...informeData.usuarios, value];
      setInformeData({
        ...informeData,
        usuario: value,
        usuarios: updatedUsuarios,
      });
    } else if (fieldName === "estado") {
      if (value == "Todo") {
        setInformeData({
          ...informeData,
          [fieldName]: "Activo/Inactivo",

        });
      } else {
        setInformeData({
          ...informeData,
          [fieldName]: value,
        });
      }
    } else if (fieldName === "implemento") {
      const updatedImplemento = [...informeData.implemento];
      if (!updatedImplemento[index]) {
        updatedImplemento[index] = {};
      }
      if (subfield) {
        updatedImplemento[index] = {
          ...updatedImplemento[index],
          [subfield]: value,
        };
      }
      setInformeData({
        ...informeData,
        implemento: updatedImplemento,
      });
    } else {
      setInformeData({
        ...informeData,
        [fieldName]: value,
      });
    }
  };

  const handleEstadoFormit = (selectedEstado) => {
    console.log(selectedEstado);
    const selectedEstadoOption = selectedEstadoInfoo.find(
      (option) => option.label === selectedEstado
    );
    const array = [];
    if (selectedEstadoOption) {
      const selectedInfoEstado = selectedEstadoOption.value;
      array.push(selectedInfoEstado);
      console.log(array);
      handleInformeDataChange("estado_implemento", array);
    }
  };

  const selectedEstadoInfoo = estado.map((data) => ({
    label: data.estado,
    value: data["_id"],
  }));

  const encabezadoContentImplemento = encabezadoImplemento();

  const filterEmptyFields = (data) => {
    const filteredData = {};
    for (const [key, value] of Object.entries(data)) {
      // Excluye el campo 'usuarios' de la lógica de filtrado
      if (key === "usuarios") {
        filteredData[key] = value;
        continue;
      }

      if (Array.isArray(value) && value.every((item) => item === "")) {
        continue;
      }
      if (typeof value === "string" && value.trim() === "") {
        continue;
      }
      if (typeof value === "object" && Object.keys(value).length === 0) {
        continue;
      }
      filteredData[key] = value;
    }
    return filteredData;
  };


  const handleEnviar = () => {
    try {
      const filteredInformeData = filterEmptyFields(informeData);
      if (
        selectedOption &&
        selectedOption.label === "65374bb14d00eddbedad4102" &&
        informeData.estado === "Activo/Inactivo"
      ) {
        setInformeData({
          ...informeData,
          usuarios: [""],
        });
      }
      post("/informe", filteredInformeData).then((response) =>
        setDataResponse(response)
      );
      console.log("lol", filteredInformeData);
      setEnviado(true);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(response._id);

  const dowload = (tipo) => {
    try {
      getMultipleParametre("/informe/download/", tipo, response._id).then(
        (responses) => console.log(responses)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const descargarPdf = () => {
    dowload("pdf/");
  };

  const descargarExcel = () => {
    dowload("xlsx/");
  };

  const getContentForSelectedOption = () => {
    if (selectedOption) {
      if (selectedOption.label === "Historial de Informes") {
        return (
          <>
            <div className="cont-inf-user">
              <h2 className="titulo-inv-user">Informe de Usuario</h2>
              <TablaInformes />
            </div>

          </>
        );
      } else {
        switch (selectedOption.label) {
          case "Informe de Inventario":
            return (
              <><div className="contenedor-inf-inventario">
                 <div className="cont-inf-inv">
                  <h2 className="titulo-inv">Informe de Inventario</h2>
                  {encabezadoContentImplemento}

                  <div className="contenedor-estado">
                    <ComSelect
                      nombre="Estado"
                      items={selectedEstadoInfoo.map((opcion) => opcion.label)}
                      onChange={(value) => handleEstadoFormit(value)}
                      getOptionLabel={(option) => option.label}
                      value={selectedEstado}
                    />
                  </div>
                </div>

              </div>
               
              </>
            );

          case "Informe de Usuario":
            return (
              <>
                <div className="contenedor-informe-user">
                  <div className="purpple"></div>
                  <div className="padre-informe-user">
                    <div className="cont-inf-user">
                      <h2 className="titulo-inv-user">Informe de Usuario</h2>
                      {encabezadoContentImplemento}
                      <button className="botton-user-enviar" onClick={handleEnviar}>
                        Enviar
                      </button>
                    </div>
                    
                  </div>

                </div>



              </>
            );

          //______________ SANCIONES_______

          case "Informe de Sanciones":
            return (
              <>
              <div className="contenedor-inf-sancion">
              <div className="cont-inv-sancion">
                  <h2 className="titulo-inv-sancio">Informe de Sanciones</h2>
                  {encabezadoContentImplemento}
                  <div className="cont-sancion-inputs">
                  <Textfield
                      name="Ingrese el Documento"
                      onChange={(value) => setNumeroDocumento(value)}
                    />
                    <div className="estado-sancion">
                    <ComSelect 
                      nombre="Estado de Sancion"
                      items={["Activo", "Inactivo", "Todo"]}
                      onChange={(value) => handleInformeDataChange("estado", value)}
                      required
                    />
                    </div>
                   
                  </div>  
                        
                </div>
                

              </div>
              
              </>
            );

          case "Informe de Prestamos":
            return (
              <>
                <h2>Informe de Prestamo</h2>
                {encabezadoContentImplemento}
              </>
            );
          case "Informe de Nuevo Implemento":
            return (
              <>
                <h2 className="ti-HInfo">Informe nuevo implemento</h2>

                {encabezadoContentImplemento}

                {implemento.map((implemento, index) => (
                  <div key={index}>
                    <div className="contenedor-de-inpust-agregar-implementos">
                      <Textfield
                        name={`Nombre ${index + 1}`}
                        onChange={(value) =>
                          handleInformeDataChange(
                            "implemento",
                            value,
                            index,
                            "nombre"
                          )
                        }
                      />
                      <Textfield
                        name={`Cantidad ${index + 1}`}
                        soloNumeros={true}
                        onChange={(value) =>
                          handleInformeDataChange(
                            "implemento",
                            value,
                            index,
                            "cantidad"
                          )
                        }
                      />
                      <Textfield
                        name={`Caracteristicas ${index + 1}`}
                        onChange={(value) =>
                          handleInformeDataChange(
                            "implemento",
                            value,
                            index,
                            "caracteristicas"
                          )
                        }
                      />
                    </div>
                  </div>
                ))}

                <button className="btn-agregar-implemento" onClick={agregarImplemento}>Agregar Implemento</button>
              </>
            );

          default:
            return null;
        }
      }
    }
    return null;
  };

  //____________________________________________

  return (
    <Box>
      <Menu></Menu>
      <React.Fragment>
        <Dialog open={open} onClose={handleClose}>
          <div className="cont-informe">
            <DialogTitle>Elija el informe que desea generar</DialogTitle>
            <DialogContent>
              <ComSelect
                nombre="Tipo de informe"
                items={selectedTipoInfo.map((opcion) => opcion.label)}
                onChange={(value) => handleTipoInformeFormit(value)}
                getOptionLabel={(option) => option.label}
                value={selectedOption}
              />
            </DialogContent>
            <DialogActions>
              <Button
                className="botton-inf-user"
                onClick={() => {
                  navigate("/admin");
                }}
              >
                Cancelar
              </Button>
              <Button className="botton-inf-user" onClick={handleClose}>Generar</Button>
              <Button onClick={() => setShowHistorial(true) & setOpen(false) }>
                Historial de Informes
              </Button>
            </DialogActions>
          </div>

        </Dialog>
      </React.Fragment>

      <Stack>
        <Snackbar
          className="Snackbar-contraseña"
          open={openSnack}

          autoHideDuration={6000}
          onClose={handleCloseSnackBar}
        >
          <Alert
            onClose={handleCloseSnackBar}
            severity="error"
            sx={{ width: "100%" }}
          >
            Debe seleccionar una Informe
          </Alert>
        </Snackbar>
      </Stack>

      {showHistorial ? (
        <div className="cont-hist-inf">
          <h2 className="ti-HInfo">Historial de Informes</h2>
          <TablaInformes />
        </div>
      ) : (
        getContentForSelectedOption()
      )}


      {enviado && (
        <div className="contenedor-ex-pd">
          <Buttons nombre="Excel" onclick={descargarExcel}></Buttons>
          <Buttons nombre="Pdf" onclick={descargarPdf}></Buttons>
        </div>
      )}
    </Box>
  );
}