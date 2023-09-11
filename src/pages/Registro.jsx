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
import Paginacion from "../components/Paginacion/Paginacion.jsx";

export default function Registro () {
  const [info, setInfo] = useState({})
  const [submittedData, setSubmittedData] = useState(null);
  const [errors, setErrors] = useState({});
  const [jsonData, setJsonData] = useState(null)
  const [value, actualizar] = useState([])
  const [valorE, setEps] = useState([])

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
    const validationErrors = validateForm(info);
    if (Object.keys(validationErrors).length === 0) {
      console.log(info)
      setSubmittedData(info)
    } else {
      setErrors(validationErrors)
    };
  };

  useEffect(()=> {
  get('/ficha').then(data =>{
    actualizar(data)
  })
  .catch(error=>  {
    console.error('Error al enontrar resultado', error)
  });
  },[]);

  const fichas = value.map(item => item.codigo)

  
  useEffect(()=> {
  get('/eps').then(data =>{
    setEps(data)
  })
  .catch(error=>  {
    console.error('Error al enontrar resultado', error)
  });
  },[]);

  const eps = valorE.map(item => item.nombre)


    return (
      <div className="padre">
      <form onSubmit={handleSubmit} className="form">

      <div className="contenedor1">
      <div className="item">
        <Textfield 
        name='Nombres'
        onChange={(value) => handleChange('Nombres', value)} 
        error={errors.Nombres}
        className={errors.Nombres ? 'error-field' : ''}/>
        {errors.Nombres && <p className="error-message">{errors.Nombres}</p>}
      </div>

      <div className="item">
        <Textfield 
        name='Apellidos' 
        onChange={(value) => handleChange('Apellidos', value)} 
        error={errors.Apellidos}/>
        {errors.Apellidos && <p className="error-message">{errors.Apellidos}</p>}
      </div>

      <div className="item">
        <ComSelect 
        nombre= "Tipo de documento" 
        items={["C.C", "T.I", "P.A","C.E"]} 
        onChange={(value) => handleChange('TipoDoc', value)} 
        error={errors.TipoDoc}/>
        {errors.TipoDoc && <p className="error-message">{errors.TipoDoc}</p>}
      </div>

      <div className="item">
        <Textfield 
        name='Número de documento' 
        onChange={(value) => handleChange('NumeroDoc', value)}/>
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
        array={fichas.map(a=>({label: a}))}
         onChange={(value) => handleChange('Ficha', value)}/>
      </div>

      <div className="item">
        <Textfield 
        name='Teléfono' 
        onChange={(value) => handleChange('Telefono', value)}/>
      </div>

      <div className="item">
        <Textfield 
        name='Dirección' 
        onChange={(value) => handleChange('Dirección', value)}/>
      </div>

      <div className="item">
        <AutoComplete 
        nombre= 'EPS' 
        array={eps.map(b=>({label:b}))} 
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

      <Paginacion />

      <Link to="/Home">Home</Link>
      </form>
      </div>
  )
};
