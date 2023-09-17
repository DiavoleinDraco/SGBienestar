import ComSelect from "../components/ComSelect/ComSelect.jsx";
import AutoComplete from "../components/AutoComplete/AutoComplete.jsx";
import Textfield from "../components/Textfield/Textfield.jsx";
import ModalTyC from "../components/ModalTyC/ModalTyC.jsx";
import Buttons from "../components/Buttons/Buttons.jsx";
import Date from "../components/Date/Date.jsx";
import { Link } from "react-router-dom";
import ButtonContraseña from "../components/ButtonContraseña/ButtonContraseña.jsx";
import InputCorreo from "../components/ComantCorreo/ComantCorreo.jsx";
import './registro.css';
import { useState, useEffect } from "react";
import get, { post } from "../UseFetch.js";
import miimagen from '../pages/imagenes/sena-bienestar.png'
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from '@mui/material/Stack';
import { forwardRef } from "react";


export default function Registro () {
  const [info, setInfo] = useState({});
  const [errors, setErrors] = useState({});
  const [jsonData, setJsonData] = useState(null);
  const [fichas, setFichas] = useState([]);
  const [selectedFichaId, setSelectedFichaId] = useState(null);
  const [eps, setEps] = useState([]);
  const [selectedEpsId,setSelecteEpsId ]= useState(null);
  const [datosListos, setDatosListos] = useState(false);
  const [rol, setRol] = useState([])
  const [selectRolId, setSelectRolId] = useState (null);
  const [aceptoTerminos, setAceptoTerminos] = useState(false);
  const [open, setOpen] = useState(false);

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  
  const handleAceptoTerminosChange = (value) => {
    setAceptoTerminos(value);
  };

  let updatedInfo = null
  const handleChange = (fieldName, fieldValue) => {
    setInfo((prevInfo) => {
      updatedInfo = { ...prevInfo, [fieldName]: fieldValue}
      return updatedInfo
    });
    setErrors((prevErrors) => {
      return { ...prevErrors, [fieldName]: '' };
    });
  };

  const handleRegistroClick = () => {
    if (aceptoTerminos) {;
      if (aceptoTerminos) {
        info['pps'] = aceptoTerminos;
        post("/registro", info)
        console.log('Registro exitoso',info)
      } else {
        setOpen(true);
      }
    } else {
      setOpen(true);
    }
  }


  useEffect(() => {
    if (fichas.length > 0 && eps.length > 0 && rol.length > 0) {
      
      setDatosListos(true);
    }
  }, [fichas, eps, rol]);

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
    setInfo(updatedInfo)
    setSelectRolId(selectRolId);
  }
}

const rolOption = rol.map((rol) => ({
label: rol.nombre , value: rol["_id"]}));

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
      setSelectedFichaId(selectedFichaId); // This should be setSelectedFichaId, not value
      console.log(updatedInfo);
    }
  };

    const fichasOptions = fichas.map((ficha) => ({
    label: ficha.codigo , value: ficha["_id"]}));
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
        <h1 className="tittle">Registrate</h1>
        
    
        <ul className="slider">
          <li id="slide1" >
            
      <div className="contenedor uno">
      <div className="item">
        <Textfield 
        name='Nombres'
        onChange={(value) => handleChange('nombres', value)}
        required/>
      </div>

      <div className="item">
        <Textfield 
        name='Apellidos' 
        onChange={(value) => handleChange('apellidos', value)}
        required/>
      </div>

      <div className="item">
        <ComSelect 
        nombre= "Tipo de documento" 
        items={["C.C", "T.I", "P.A","C.E"]} 
        onChange={(value) => handleChange('tipo_doc', value)}
        required/>
      </div>

      <div className="item">
        <Textfield 
        name='Número de documento' 
        onChange={(value) => handleChange('n_doc', value)}
        required/>
      </div>

      <div className="item item-fecha">
        <Date 
        Descripcion= 'Fecha de Nacimiento' 
        onChange={(value) => handleChange('nacimiento', value)}/>
      </div>

      <div className="item">
      <ComSelect 
          nombre="Rol" 
          items={rolOption.map(opcion => opcion.label)}
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
        name='Teléfono' 
        onChange={(value) => handleChange('telefono', value)}
        required/>
      </div>

      <div className="item">
        <Textfield 
        name='Dirección' 
        onChange={(value) => handleChange('direccion', value)}/>
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
        nombre= "Tipo de Sangre" 
        items={["A+","O+","B+","AB+","A-","O-","B-","AB-"]} 
        onChange={(value) => handleChange('rh', value)}/>
      </div>

      <div className="item">
        <ComSelect 
        nombre= "Género" 
        items={["Masculino","Femenino","Otro"]} 
        onChange={(value) => handleChange('genero', value)}/>
      </div>

      </div>
      </li>
      <li id="slide3">
      <div className="contenedor tres">
      <div className="item">
        <InputCorreo 
        label='Correo institucional' 
        institutional 
        onChange={(value) => handleChange('correo_inst', value)}
        required/>
      </div>

      <div className="item">
        <InputCorreo 
        label='Correo personal'
        onChange={(value) => handleChange('correo_pers', value)}/>
      </div>

      <div className="item">
        <ButtonContraseña 
        nombre={"contraseña"} 
        onChange={(value) => handleChange('contrasena', value)}
        required/>
      </div>

      <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Completa todos los campos obligatorios!
        </Alert>
      </Snackbar>
    </Stack>

      <div className="item-TyC">
        <ModalTyC 
        nombre='Términos y condiciones' 
        texto='Términos y Condiciones del Sitio Web' 
        onChange={handleAceptoTerminosChange}/>
        </div>

      <div className="item">
        <Buttons nombre='Registrarse' 
        onclick={(handleRegistroClick)}
        disabled={!aceptoTerminos}/>
      </div>
      </div>

      </li>
      </ul>
      <ul className="menu">
        <li><a href="#slide1">1</a>
        <a href="#slide2">2</a>
        <a href="#slide3">3</a>
        </li>
      </ul>
      </form>
      </div>
  );
};
