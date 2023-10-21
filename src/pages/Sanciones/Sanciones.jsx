import MultipleSelect from '../../components/MultipleSelect/MultipleSelect';
import Textfield from '../../components/Textfield/Textfield';
import { useState } from "react";
import Menu from '../../components/menu/Menu';
import { post } from "../../UseFetch";
import { forwardRef } from "react";
import ComSelect from "../../components/ComSelect/ComSelect"
import MuiAlert from "@mui/material/Alert";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Dialogs from "../../components/Dialog/Dialog";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import './Sanciones.css';
import HistorialSanciones from '../../components/HistorialSanciones/HistorialSanciones';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
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

  const handleClickOpenCrear = () => {
    setOpenDialogoCrear(true);
  };
  const handleCloseCrear = () => {
    setOpenDialogoCrear(false);
  };

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const selectOptions = [
    { value: 'opcion1', label: 'Incumplimiento de la entrega del implemento' },
    { value: 'opcion2', label: 'Daño del implemento deportivo' },
    { value: 'opcion3', label: 'Faltas recurrentes por la entrega tardía del implemento' },
    { value: 'opcion4', label: 'Uso indebido de la plataforma de préstamos' },
    { value: 'opcion5', label: 'Faltas reiterativas de las normas de uso' },
  ];

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };
  

  const handleSanciones = (fieldName, value) => {
    if (fieldName === "usuario") {
      setIdUsuario(value);
    } else if (fieldName === "description") {
      if (selectedOptions.length > 0) {
        setSancionesAplicadas(value);
      } else {
        setSancionesAplicadas(prevSanciones => prevSanciones ? prevSanciones + ", " + value : value);
      }
    } else if (fieldName === "estado") {
      setEstadoS(value);
    } else if (fieldName === "duracion") {
      const parsedValue = parseFloat(value);
      setTiempoS(parsedValue);
    }
  };

  const handleEnviarSanciones = async () => {
   
    let tiempoEnHoras = parseFloat(tiempoS);
  
    if (unidadTiempo === "Dias") {
      tiempoEnHoras *= 24;
    } else if (unidadTiempo === "Meses") {
      tiempoEnHoras *= 730;
    }
  
    let combinedDescription = sancionesAplicadas;
    if (selectedOptions.length > 0) {
      const selectedSanciones = selectedOptions.map(option => option.label).join(', ');
      combinedDescription = combinedDescription ? combinedDescription + ', ' + selectedSanciones : selectedSanciones;
    }
  
    if (!idUsuario || !combinedDescription || !estadoS || !tiempoEnHoras || isNaN(tiempoEnHoras)) {
      setErrorMensaje("Debes completar los campos requeridos antes de aplicar la sanción");
      setOpen(true);
    } else {
      setErrorMensaje("");
      setOpen(false);
  
      const data = {
        usuario: idUsuario,
        description: combinedDescription,
        estado: estadoS,
        duracion: Math.round(tiempoEnHoras),
      };
  
      console.log(data);
  
      try {
        const response = await post("/sanciones", data);
        setDialogMessage("Se le ha aplicado la sanción a este aprendiz");
        setDialogOpen(true);
        console.log("Se ha creado la sanción con éxito");
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }
  };
  
  

  return (
    <div className='container-sanciones'>
      <Menu></Menu>
      <p>Sanciones</p>
      <HistorialSanciones />
      
      
      <Fab color="secondary" variant="outlined" onClick={handleClickOpenCrear} aria-label="add" sx={{position: 'relative', top: '440px', left: '590px'}}>
        <AddIcon />
      </Fab>
      <BootstrapDialog
        onClose={handleCloseCrear}
        aria-labelledby="customized-dialog-title"
        open={openDialogoCrear}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Aplicar Nueva Sanción
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseCrear}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor ea autem maxime beatae incidunt distinctio deserunt nulla soluta ipsum. Nulla dolore architecto corporis inventore possimus expedita officia provident voluptatibus sint.
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center' }}>
        <p>Ingresar ID</p>
        <Textfield
          name=""
          onChange={(value) => handleSanciones("usuario", value)}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p>Sancion</p>
        <MultipleSelect
          options={selectOptions}
          selectedOptions={selectedOptions}
          onChange={handleChange}
          handleSanciones={(value) => handleSanciones("description", value)}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p>Nueva sancion</p>
        <Textfield
          className="son-codigo"
          name=""
          onChange={(value) => handleSanciones("description", value)}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p>Tiempo de la sancion</p>
        <Textfield
          className="son-codigo"
          name=""
          onChange={(value) => handleSanciones("duracion", value)}
        />
        <ComSelect
          nombre=""
          items={["Horas", "Dias", "Meses"]}
          onChange={(value) => setUnidadTiempo(value)}
        />
        <div className='alert-sanciones'>
          {errorMensaje && (
            <Alert onClose={() => setErrorMensaje("")} severity="error" sx={{}}>
              {errorMensaje}
            </Alert>
          )}
        </div>
        <div className="item item-link">
          <Link className="custom-link link-inicio" to="/sanciones"></Link>
        </div>
      </div>
      <Dialogs
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        titulo=""
        contenido={dialogMessage}
        onSave={() => setDialogOpen(false)}
        redirectTo="aceptar"
      />
      <div>
        <div className='btn-sanciones'>
        <Stack direction="row" spacing={2}>
      <Button onClick={handleEnviarSanciones} variant="contained" endIcon={<SendIcon />}>
        Send
      </Button>
    </Stack>
        </div>
      </div>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}