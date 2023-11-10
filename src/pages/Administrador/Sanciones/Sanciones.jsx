import MultipleSelect from "../../../components/MultipleSelect/MultipleSelect";
import Textfield from "../../../components/Textfield/Textfield";
import { useState } from "react";
import Menu from "../../../components/menu/Menu";
import { post } from "../../../UseFetch";
import { forwardRef } from "react";
import ComSelect from "../../../components/ComSelect/ComSelect";
import MuiAlert from "@mui/material/Alert";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import "./Sanciones.css";
import HistorialSanciones from "../../../components/HistorialSanciones/HistorialSanciones";
import { useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import { style } from "@mui/system";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function Sanciones() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [idUsuario, setIdUsuario] = useState("");
  const [sancionesAplicadas, setSancionesAplicadas] = useState("");
  const [tiempoS, setTiempoS] = useState(null);
  const [estadoS, setEstadoS] = useState(true);
  const [errorMensaje, setErrorMensaje] = useState("");
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [unidadTiempo, setUnidadTiempo] = useState("Horas");
  const [dialogCrearSancion, setDialogCrearSancion] = useState(false);
  const [openDialogoCrear, setOpenDialogoCrear] = useState(false);
  const location = useLocation();
  const userData = location.state?.userData || null;
  const datosAlmacenados = sessionStorage.getItem("as");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  let datosObjeto = null;

  //_________

  const openConfirmDialog = () => {
    setConfirmDialogOpen(true);
  };
  const handleConfirmAction = async () => {
    await handleEnviarSanciones();

    setConfirmDialogOpen(false);
  };

  const handleCancelAction = () => {
    sessionStorage.removeItem("as");
    setConfirmDialogOpen(false);
  };

  //___________________________________________

  useEffect(() => {
    const datosAlmacenados = sessionStorage.getItem("as");
    let datosObjeto = null;

    if (datosAlmacenados) {
      datosObjeto = JSON.parse(datosAlmacenados);

      if (datosObjeto.id) {
        setOpenDialogoCrear(true);
      }
    }
  }, []);

  //_______ Convierte los datos a un objeto si están presentes en el sessionStorage
  datosObjeto = JSON.parse(datosAlmacenados);

  //_______________________

  const handleClickOpenCrear = () => {
    setOpenDialogoCrear(true);
  };
  const handleCloseCrear = () => {
    setOpenDialogoCrear(false);
    sessionStorage.removeItem("as");
  };

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const selectOptions = [
    { value: "opcion1", label: "Incumplimiento de la entrega del implemento" },
    { value: "opcion2", label: "Daño del implemento deportivo" },
    {
      value: "opcion3",
      label: "Faltas recurrentes por la entrega tardía del implemento",
    },
    { value: "opcion4", label: "Uso indebido de la plataforma de préstamos" },
    { value: "opcion5", label: "Faltas reiterativas de las normas de uso" },
  ];

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const handleSanciones = (fieldName, value) => {
    const num = value.target.value
    console.log(value)
    if (fieldName === "usuario") {
      setIdUsuario(value);
    } else if (fieldName === "description") {
      if (selectedOptions.length != undefined) {
        setSancionesAplicadas(value);
      } else {
        setSancionesAplicadas((prevSanciones) =>
          prevSanciones ? prevSanciones + ", " + value : value
        );
      }
    } else if (fieldName === "estado") {
      setEstadoS(value);
    } else if (fieldName === "duracion") {
      const parsedValue = parseFloat(num);
      setTiempoS(parsedValue);
    }
  };

  const handleEnviarSanciones = async () => {
    console.log(datosObjeto.id);


    let tiempoEnHoras = parseFloat(tiempoS);
    console.log(tiempoEnHoras)
    if (unidadTiempo === "Días") {
      tiempoEnHoras *= 24;
    } else if (unidadTiempo === "Meses") {
      tiempoEnHoras *= 730;
    }

    let combinedDescription = sancionesAplicadas;
    if (selectedOptions.length > 0) {
      const selectedSanciones = selectedOptions
        .map((option) => option.label)
        .join(", ");
      combinedDescription = combinedDescription
        ? combinedDescription + ", " + selectedSanciones
        : selectedSanciones;
    }
    console.log({
      usuario: datosObjeto.id,
      description: combinedDescription,
      estado: estadoS,
      duracion: Math.round(tiempoEnHoras),
    })
    if (
      !combinedDescription ||
      !estadoS ||
      !tiempoEnHoras ||
      isNaN(tiempoEnHoras)
    ) {
      setErrorMensaje(
        "Debes completar los campos requeridos antes de aplicar la sanción"
      );
      setOpen(true);
    } else {
      setErrorMensaje("");
      setOpen(false);

      const data = {
        usuario: datosObjeto.id,
        description: combinedDescription,
        estado: estadoS,
        duracion: Math.round(tiempoEnHoras),
      };


      try {
        const response = await post("/sanciones", data);
        setDialogMessage("Se le ha aplicado la sanción a este aprendiz");
        setDialogOpen(true);
        sessionStorage.removeItem("as");
        console.log("Se ha creado la sanción con éxito");
        setOpenDialogoCrear(false);

      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }
  }


  return (
    <div className="container-sanciones">
      <Menu></Menu>

      <div className="sanciones-div">
        <p
          style={{
            fontSize: "30px",
            margin: "0",
            color: "#000",
            marginTop: "5px",
          }}
        >
          APARTADO DE SANCIONES <i className="bi bi-person-exclamation"></i>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="40"
            fill="currentColor"
            className="bi bi-person-exclamation"
            viewBox="0 0 16 16"
            marginTop="10px"
          >
            <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm.256 7a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
            <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1.5a.5.5 0 0 0 1 0V11a.5.5 0 0 0-.5-.5Zm0 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z" />
          </svg>
        </p>
      </div>

      <div
        className="contenedor-tabla-sanciones"
        style={{
          border: "1px solid black",
          borderRadius: "10px",
          height: "80%",
          background: "rgba(255, 255, 255, 0.5)",
          padding: "10px",
          width: "70%",
          top: "10px",
          position: "relative",
        }}
      >
        {" "}
        <HistorialSanciones />
      </div>

      <div className="container-botones">
        <Fab
          style={{ display: "none" }}
          color="secondary"
          variant="outlined"
          onClick={handleClickOpenCrear}
          aria-label="add"
          className="fab-button"
        >
          <AddIcon />
        </Fab>
      </div>

      <BootstrapDialog
        style={{ background: "rgba(0,0,0,0.2)" }}
        onClose={handleCloseCrear}
        aria-labelledby="customized-dialog-title"
        open={openDialogoCrear}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            position: "absolute",
            left: "54%",
            transform: "translateX(-50%)",
          }}
          id="customized-dialog-title"
        >
          Aplicar Nueva Sanción
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={handleCloseCrear}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers style={{ overflowX: "hidden" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <div className="dialog-text-container">
              <Typography className="dialog-text" gutterBottom>
                Seleccione la sanción deseada para este usuario.
              </Typography>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                float: "left",
                marginRight: "10px",
              }}
            >
              <p style={{ marginLeft: "-100px" }}>Número de Documento</p>
            </div>
            <input
              style={{ width: "90%", height: "30px", fontSize: "15px" }}
              type="text"
              className="inputt"
              value={
                datosObjeto && datosObjeto.numDoc !== undefined
                  ? datosObjeto.numDoc
                  : ""
              }
              onChange={(e) => {
                if (datosObjeto) {
                  userData({ ...userData, numDoc: e.target.value });
                }
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <p style={{ marginLeft: "-136px" }}>Correo Electrónico</p>
            </div>
            <input
              style={{ width: "90%", height: "30px", fontSize: "15px" }}
              type="text"
              className="inputt"
              value={
                datosObjeto && datosObjeto.correo_inst !== undefined
                  ? datosObjeto.correo_inst
                  : ""
              }
              onChange={(e) => {
                if (datosObjeto) {
                  userData({ ...userData, correo_inst: e.target.value });
                }
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div style={{ flex: 1, marginLeft: "44px", marginRight: "44px" }}>
              <p style={{ marginLeft: "-210px" }}>Sanción</p>
              <MultipleSelect
                options={selectOptions}
                selectedOptions={selectedOptions}
                onChange={handleChange}
                handleSanciones={(value) =>
                  handleSanciones("description", value)
                }
                className="custom-multiple-select"
              />
            </div>
          </div>

          <div style={{ marginBottom: "10px", width: "100%" }}>
            <p style={{ marginRight: "160px" }}>Nueva sanción</p>
            <input
              style={{ width: "264px", height: "30px" }}
              name=""
              onChange={(value) => handleSanciones("description", value)}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <p style={{ marginRight: "110px" }}>Tiempo de la sanción</p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  marginLeft: "-30px",
                }}
              >
                <input
                  style={{
                    width: "50px",
                    height: "30px",
                    position: "relative",
                    left: "28px",
                  }}
                  name=""
                  onChange={(value) => handleSanciones("duracion", value)}
                />
                <div style={{ marginBottom: "14px", marginLeft: "40px" }}>
                  <ComSelect
                    nombre=""
                    items={["Horas", "Días", "Meses"]}
                    onChange={(value) => setUnidadTiempo(value)}
                  />
                </div>
              </div>
            </div>

            <div
              className="alert-sanciones"
              style={{ marginTop: "10px", maxWidth: "350px" }}
            >
              {errorMensaje && (
                <Alert
                  onClose={() => setErrSorMensaje("")}
                  severity="error"
                  sx={{}}
                >
                  {errorMensaje}
                </Alert>
              )}
            </div>

            <div className="item item-link" style={{ marginTop: "10px" }}>
              <Link
                className="custom-link link-inicio"
                to={window.location.reload}
              ></Link>
            </div>
          </div>

          <Dialog
            open={confirmDialogOpen}
            onClose={() => setConfirmDialogOpen(false)}
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-description"
          >
            <DialogTitle id="confirm-dialog-title">Confirmación</DialogTitle>
            <DialogContent className="contenedor">
              <Typography className="pregunta" id="confirm-dialog-description">
                ¿Está seguro de que desea aplicar esta sanción?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancelAction} color="primary">
                Cancelar
              </Button>
              <Button onClick={handleConfirmAction} color="primary">
                Aceptar
              </Button>
            </DialogActions>
          </Dialog>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className="btn-sanciones">
              <Stack direction="row" spacing={2}>
                <Button
                  onClick={openConfirmDialog}
                  variant="contained"
                  endIcon={<SendIcon />}
                >
                  Sancionar
                </Button>
              </Stack>
            </div>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}