import React, { useState, useEffect } from "react";
import Menu from '../../components/menu/Menu';
import Box from '@mui/material/Box';
import Textfield from '../../components/Textfield/Textfield';
import ComSelect from '../../components/ComSelect/ComSelect';
import './Informes.css'
import Date from '../../components/Date/Date';
import NavTabs from '../../components/NavTabs/NavTabs';
import Buttons from '../../components/Buttons/Buttons';
import BasicAccordion from '../../components/BasicAccordion/BasicAccordion';
import get from "../../UseFetch";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function Informes () {
  const [estado, setEstado] = useState([])
  const [additionalInfoCount, setAdditionalInfoCount] = useState(1);
    const [selectedEstado, setSelectedEstado] = useState(null)
    const [opcionesComSelect, setOpcionesComSelect] = useState([]);
    const [open, setOpen] = useState(true);
    const [openSnack, setOpenSanck] = useState(false);
    const [selectedOption, setSelectedOption] = useState(''); 
    const [tipo, setTipo] = useState([]);
    const navigate = useNavigate();
    const [informeData, setInformeData] = useState({
      tipoInforme: '',
      fecha: '',
      numeroInforme: '',
      nombreFuncionario: '',
      docIdentidad: '',
      dependencia: '',
      detalleInforme: '',
      implementos: '',
      descripcion: '',
      cantidad: '',
      infoAdicional: [
        {
          nombreImple: '',
          unidades: '',
          caracteristicas: '',
        },
      ],
     

    });
    
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      if (selectedOption) {
        setOpen(false);
      } else {
        // Puedes mostrar un mensaje de error o realizar otra acción aquí
        setOpenSanck(true)
      }
    };

    const handleCloseSnackBar = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setOpenSanck(false);
    };
    

    console.log('informedata', informeData)

    useEffect(() => {
        get("/tipo-informe")
        .then((data) => {
          setTipo(data);
          console.log('data de tipo: ', data)
          if(data.length > 0){
            setInformeData({
              ...informeData,
              tipoInforme: data[0]._id,
            });

          }
        })
        .catch((error) => {
          console.error("Error al encontrart el resultado", error);
        });
    }, []);

    const handleTipoInformeFormit = (selectedTipo) => {
      const selectedTipoInformeOption = selectedTipoInfo.find(
        (option) => option.label === selectedTipo
      );

      if(selectedTipoInformeOption) {
        const selectedInfoTipo = selectedTipoInformeOption.value;
        
    setSelectedOption(selectedTipoInformeOption)
        const updateInfo = {
          ...informeData, tipoInforme: selectedInfoTipo
        }
        setInformeData(updateInfo)
      }
    }

    const selectedTipoInfo = tipo.map((tipo) => ({
      label: tipo.nombre,
      value: tipo['_id']
    }))
  

  const encabezadoImplemento = () => (
    <div className='container-Informes'>
      <Textfield 
      name="Nombre del Funcionario" 
      onChange={(value) => handleInformeDataChange("nombreFuncionario", value)}
      />
      <Textfield 
      inicial='Bienestar'
      name="Dependencia" 
      onChange={(value) => handleInformeDataChange("dependencia", value)}
      />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p>Observaciones</p>
        <TextField multiline name="" onChange={(value) => handleInformeDataChange("dependencia", value)}/>
        </div>
    </div>
  );

  
  const handleInformeDataChange = (fieldName, value, index, subfield) => {
    if (fieldName === "infoAdicional") {
      // Clona el array existente
      const updatedInfoAdicional = [...informeData.infoAdicional];
  
      if (!updatedInfoAdicional[index]) {
        updatedInfoAdicional[index] = {}; // Inicializa el objeto si es nuevo
      }
  
      if (subfield) {
        // Solo agrega el campo si se proporciona un subfield (nombreImple, unidades, caracteristicas)
        updatedInfoAdicional[index] = {
          ...updatedInfoAdicional[index],
          [subfield]: value,
        };
      }
  
      // Actualiza el estado con el nuevo array clonado
      setInformeData({
        ...informeData,
        infoAdicional: updatedInfoAdicional,
      });
    } else {
      // Lógica para otros campos
      setInformeData({
        ...informeData,
        [fieldName]: value,
      });
    }
  };

  useEffect(() => {
    get("/estado-implemento")
      .then((data) => {
        setEstado(data);
        console.log('Estados: ', data)
      })
      .catch((error) => {
        console.error("Error al encontrart el resultado", error);
      });
  }, []);

  const handleEstadoFormit = (selectedEstado) => {
    const selectedEstadoOption = selectedEstadoInfoo.find(
      (option) => option.label === selectedEstado
    );
  
    if(selectedEstadoOption){ 
      const selectedInfoEstado = selectedEstadoOption.value;
      setNewImplemento((prevNewImplemento) => ({
        ...prevNewImplemento,
        estado: [
          {
            estado: selectedInfoEstado,
            cantidad: prevNewImplemento.estado[0].cantidad,
            apto: aptoValue,
          },
        ],
      }));
    }
  }

  const selectedEstadoInfoo = estado.map((data) => ({
    label: data.estado,
    value: data['_id']
  }))

  const handleDeleteInfoAdicional = (index) => {
    if (additionalInfoCount > 1) {
      // Clona el array existente de infoAdicional
      const updatedInfoAdicional = [...informeData.infoAdicional];
      updatedInfoAdicional.splice(index, 1); // Elimina el campo adicional específico
      setInformeData({
        ...informeData,
        infoAdicional: updatedInfoAdicional,
      });
      setAdditionalInfoCount(additionalInfoCount - 1);
    }
  };
  
  const encabezadoContentImplemento = encabezadoImplemento();

  const getContentForSelectedOption = () => {
    if (selectedOption) {
      switch (selectedOption.label) {
        case 'Informe de Estado':
          return (
            <>
              {encabezadoContentImplemento}
              {Array.from({ length: additionalInfoCount }).map((_, index) => (
                <BasicAccordion
                  key={index}
                  titulo={`Implemento ${index + 1}`}
                  contenido={
                    <>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <p>Nombre del Implemento</p>
                        <Textfield
                          nombre="nombreImple"
                          onChange={(value) =>
                            handleInformeDataChange("infoAdicional", value, index, "nombreImple")
                          }
                        />
                        <p>Unidades</p>
                        <Textfield
                          name="unidades"
                          onChange={(value) =>
                            handleInformeDataChange("infoAdicional", value, index, "unidades")
                          }
                        />
                        <p>Caracteristicas</p>
                        <Textfield
                          name="caracteristicas"
                          onChange={(value) =>
                            handleInformeDataChange("infoAdicional", value, index, "caracteristicas")
                          }
                        />
                        {index > 0 && ( // Muestra el botón "delete" solo si el acordeón no es el primero
                    <IconButton onClick={() => handleDeleteInfoAdicional(index)}>
                      <DeleteIcon />
                    </IconButton>
                  )}

                      </div>
                    </>
                  }
                />
              ))}
              <Fab
                size="small"
                color="secondary"
                aria-label="add"
                onClick={() => setAdditionalInfoCount(additionalInfoCount + 1)}
              >
                <IconButton>
                  <AddIcon />
                </IconButton>
              </Fab>
            </>
          );
        case 'Informe de Inventario':
          return (
            <>
              <h2>hola inve</h2>
              {encabezadoContentImplemento}
              <ComSelect
                nombre="Estado"
                items={selectedEstadoInfoo.map((opcion) => opcion.label)}
                onChange={(value) => handleEstadoFormit(value)}
                getOptionLabel={(option) => option.label}
                value={selectedEstado}
              />
            </>
          );
        case 'Informe de Usuario':
          return (
            <>
              <h2>Hola usu</h2>
              {encabezadoContentImplemento}
            </>
          );
        case 'Informe de Sanciones':
          return (
            <>
              <h2>hola san</h2>
              {encabezadoContentImplemento}
              <ComSelect nombre="Estado" items={['Activo', 'Inactivo', 'Todos']} />
            </>
          );
        default:
          return null;
      }
    }
    return null;
  };



    return (
      <Box sx={{ display: 'block', position: 'relative', left: '200px'}}>
        <Menu />
        <h1>Apartado de informes</h1>
        <React.Fragment>
      <Dialog open={open} onClose={handleClose}>
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
          <Button onClick={()=>{navigate('/admin')}}>Cancelar</Button>
          <Button onClick={handleClose}>Generar</Button>
        </DialogActions>
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
          Debe seleccionar una ficha
        </Alert>
      </Snackbar>
    </Stack>

        {getContentForSelectedOption()}
      </Box>
    );
};