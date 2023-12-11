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

  //_

  const openConfirmDialog = () => {
    setConfirmDialogOpen(true);
  };
  const handleConfirmAction = async () => {
    await handleEnviarSanciones();
   // window.location.reload();
    setConfirmDialogOpen(false);
  };

  const handleCancelAction = () => {
    sessionStorage.removeItem("as");
    setConfirmDialogOpen(false);
  };

  //_____

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

  //_ Convierte los datos a un objeto si están presentes en el sessionStorage
  datosObjeto = JSON.parse(datosAlmacenados);

  //___

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
    console.log(selectedOptions)
    setSelectedOptions(selectedOptions);
  };


  const handleSanciones = (fieldName, event) => {
    const num = event.target.value;
 
    if (fieldName === "usuario") {
      setIdUsuario(event.target.value);
    } else if (fieldName === "description") {
      const selectedSanciones = Array.isArray(selectedOptions) && selectedOptions.length > 0
        ? selectedOptions.map(option => option.label).join(", ")
        : "";
      console.log(selectedSanciones)
      const descriptionValue = event.target.value;
 
      setSancionesAplicadas(selectedSanciones
        ? (descriptionValue ? selectedSanciones + ", " + descriptionValue : selectedSanciones)
        : descriptionValue
      );
      console.log(sancionesAplicadas)

    } else if (fieldName === "estado") {
      setEstadoS(event.target.value);
    } else if (fieldName === "duracion") {
      const parsedValue = parseFloat(num);
      setTiempoS(parsedValue);
    }
  };
 
 
 
 
 
 







  const handleEnviarSanciones = async () => {
    console.log(datosObjeto.id);
 
    let tiempoEnHoras = parseFloat(tiempoS);
    console.log(tiempoEnHoras);
    if (isNaN(tiempoEnHoras)) {
      setErrorMensaje("Tiempo de la sanción no válido");
      setOpen(true);
      return;
    }
 
    if (unidadTiempo === "Días") {
      tiempoEnHoras *= 24;
    } else if (unidadTiempo === "Meses") {
      tiempoEnHoras *= 730;
    }
 
    let combinedDescription = sancionesAplicadas;
    console.log(sancionesAplicadas);
    if (selectedOptions.length > 0) {
      const selectedSanciones = selectedOptions
        .map((option) => option.label)
        .join(", ");
 
      if (combinedDescription) {
        combinedDescription += ", " + selectedSanciones;
      } else {
        combinedDescription = selectedSanciones;
      }
    }
   
    console.log(sancionesAplicadas);
    console.log({
      usuario: datosObjeto.id,
      description: combinedDescription,
      estado: estadoS,
      duracion: Math.round(tiempoEnHoras),
    });
 
    if (!combinedDescription || !estadoS || isNaN(tiempoEnHoras)) {
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
 
      console.log(data);
 
      try {
        const response = await post("/sanciones", data);
        setDialogMessage("Se le ha aplicado la sanción a este aprendiz");
        setDialogOpen(true);
        sessionStorage.removeItem("as");
        console.log("Se ha creado la sanción con éxito");
        console.log("sancion", data);
        setOpenDialogoCrear(false);
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }
  };

  return (
    <div className="container-sanciones">
      <Menu></Menu>

      <div className="contenedor-tabla-sanciones">
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
              <p style={{ marginLeft: "-180px" }}>Número de Documento</p>
            </div>
            <input
              style={{ width: "80%", height: "30px", fontSize: "15px" }}
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
              <p style={{ marginLeft: "-186px" }}>Correo Electrónico</p>
            </div>
            <input
              style={{ width: "80%", height: "30px", fontSize: "15px" }}
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

       

          <div style={{ marginBottom: "10px", width: "100%" }}>
            <p style={{ marginLeft: "-260px" }}>Nueva sanción</p>
            <input
              style={{ width: "380px", height: "30px" }}
              name=""
              onChange={(event) => handleSanciones("description", event)}
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
              <p style={{ marginLeft: "-210px" }}>Tiempo de la sanción</p>
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
                    left: "30px",
                    width: "100px",
                  }}
                  name=""
                  onChange={(value) => handleSanciones("duracion", value)}
                />
                <div style={{ marginBottom: "14px", marginLeft: "100px" }}>
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
                  onClose={() => setErrorMensaje("")}
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
            <DialogTitle className="dialogo-aplicar-sancion" id="confirm-dialog-title">Confirmación</DialogTitle>
            <DialogContent>
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