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
import get from "../UseFetch.js";

export default function Registro () {
  const [info, setInfo] = useState({});
  const [submittedData, setSubmittedData] = useState(null);
  const [errors, setErrors] = useState({});
  const [jsonData, setJsonData] = useState(null);
  const [fichas, setFichas] = useState([]);
  const [selectedFichaId, setSelectedFichaId] = useState(null);
  const [valorE, setEps] = useState([]);
  const [selectedEpsId,setSelecteEpsId ]= useState(null);

  
  let errorCampo = {};
  const validate = (data) => {
    if(!data.Nombres || !data.Apellidos || !data.Tipodedocumento || !data.Numerodedocumento || !data.Rol || !data.Teléfono){
      errorCampo.Nombres = 'Este campo es obligatorio'
      errorCampo.Apellidos = 'Este campo es obligatorio'
      errorCampo.Tipodedocumento = 'Este campo es obligatorio'
      errorCampo.Numerodedocumento = 'Este campo es obligatorio'
      errorCampo.Rol = 'Este campo es obligatorio'
      errorCampo.Teléfono = 'Este campo es obligatorio'
    } else {
      console.log('hola')
    }
    setErrors(errorCampo)
    console.log(errorCampo) 
  };

  const handleChange = (fieldName, fieldValue) => {
    setInfo((prevInfo) => {
      const updatedInfo = { ...prevInfo, [fieldName]: fieldValue }
      setJsonData(JSON.stringify(updatedInfo, null, 2))
      return updatedInfo
    });
    setErrors((prevErrors) => {
      return { ...prevErrors, [fieldName]: '' };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    const validationErrors = validate(info);
    if (Object.keys(validationErrors).length === 0) {
      console.log(info)
      setSubmittedData(info)
    } else {
      setErrors(validationErrors)
    };
  };
  
  useEffect(() => {
    get("/ficha")
      .then((data) => {
        setFichas(data);
      })
      .catch((error) => {
        console.error("Error al encontrar resultado", error);
      });
  }, []);
  
  const handleFichaChange = (selectedValue) => {
    const selectedId = selectedValue.value
    setSelectedFichaId(selectedId);
  };
    const fichasOptions = fichas.map((ficha) => ({
    label: ficha.codigo , value: ficha["_id"]}));

  useEffect(() => {
    get("/eps")
      .then((data) => {
        setEps(data);
      })
      .catch((error) => {
        console.error("Error al enontrar resultado", error);
      });
  }, []);

  const handleEpsChange = (selectedValue) => {
  const selectedIdE = selectedValue.value
  setSelecteEpsId(selectedIdE)
  };
  const EpsOpciones = valorE.map ((valorE) => ({
  label: valorE.nombre , value: valorE["_id"]}));

    return (
      <div className="padre">
      <form onSubmit={handleSubmit} className="form">

      <div className="contenedor1">
      <div className="item">
        <Textfield 
        name='Nombres'
        onChange={(value) => handleChange('Nombres', value)}
        required/>
      </div>

      <div className="item">
        <Textfield 
        name='Apellidos' 
        onChange={(value) => handleChange('Apellidos', value)}
        required/>
      </div>

      <div className="item">
        <ComSelect 
        nombre= "Tipo de documento" 
        items={["C.C", "T.I", "P.A","C.E"]} 
        onChange={(value) => handleChange('TipoDoc', value)}/>
      </div>

      <div className="item">
        <Textfield 
        name='Número de documento' 
        onChange={(value) => handleChange('NumeroDoc', value)}
        required/>
      </div>

      <div className="item">
        <Date 
        Descripcion= 'Fecha de Nacimiento' 
        onChange={(value) => handleChange('FechaNac', value)}/>
      </div>

      <div className="item">
        <ComSelect 
        nombre= "Rol" 
        items={["Instructor","Aprendiz","Administrador"]} 
        onChange={(value) => handleChange('Rol', value)}/>
      </div>
      </div>
      
      <div className="contenedor2">
      <div className="item">
        <AutoComplete 
        nombre= 'Ficha' 
        array={fichasOptions}
        onChange={(value) => handleChange('Ficha', value)}/>
      </div>

      <div className="item">
        <Textfield 
        name='Teléfono' 
        onChange={(value) => handleChange('Telefono', value)}
        required/>
      </div>

      <div className="item">
        <Textfield 
        name='Dirección' 
        onChange={(value) => handleChange('Dirección', value)}/>
      </div>

      <div className="item">
        <AutoComplete 
        nombre= 'EPS' 
        array={EpsOpciones} 
        onChange={(value) => handleChange('EPS', value)}/>
      </div>


      <div className="item">
        <ComSelect 
        nombre= "Tipo de Sangre" 
        items={["A+","O+","B+","AB+","A-","O-","B-","AB-"]} 
        onChange={(value) => handleChange('TipoSangre', value)}/>
      </div>

      <div className="item">
        <ComSelect 
        nombre= "Género" 
        items={["Masculino","Femenino","Otro"]} 
        onChange={(value) => handleChange('Genero', value)}/>
      </div>
      </div>

      <div className="contenedor3">
      <div className="item">
        <InputCorreo 
        label='Correo institucional' 
        institutional 
        onChange={(value) => handleChange('CorreoInsti', value)}/>
      </div>

      <div className="item">
        <InputCorreo 
        label='Correo personal'
        personal 
        onChange={(value) => handleChange('CorreoPer', value)}/>
      </div>

      <div className="item">
        <ButtonContraseña 
        nombre={"contraseña"} 
        onChange={(value) => handleChange('Contraseña', value)}/>
      </div>

      <div className="item">
        <ModalTyC 
        nombre='Términos y condiciones' 
        texto='Términos y Condiciones del Sitio Web' 
        onChange={(value) => handleChange('TyC', value)}/>
        </div>

      <div className="item">
        <Buttons nombre='Registrarse' onclick={() => {console.log(jsonData)}}/>
      </div>
      </div>

      <Link to="/Home">Home</Link>
      </form>
      </div>
  );
};
