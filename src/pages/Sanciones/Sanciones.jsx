import MultipleSelect from '../../components/MultipleSelect/MultipleSelect';
import Textfield from '../../components/Textfield/Textfield';
import { useState, useEffect } from "react";
import Menu from '../../components/menu/Menu';
import './Sanciones.css'


export default function Sanciones () {
const [selectedOptions, setSelectedOptions] = useState([]);


//OPCIONES DEL COMPONENTE SELECT//


const selectOptions = [
  { value: 'opcion1', label: 'Incumplimiento de la entrega del implemento' },
  { value: 'opcion2', label: 'Daño del implemento deportivo' },
  { value: 'opcion3', label: 'Faltas recurrentes por la entrega tardia del implemento ' },
  { value: 'opcion4', label: 'Uso indebido de la plataforma de prestamos' },
  { value: 'opcion5', label: 'Faltas reiterativas de las normas de uso' },
  ];

  //________________PARTE 2_____________________________

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  //_________________________________________________


  // POST //
  const handlesanciones = async () => {
    const data = { usuario, description, estado };
    try {
      const response = await post("/sanciones", data);
      console.log("se ha creado la sancion con exito");
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };


//___________________________________________________


return (
  <div className='container-sanciones'>
    
    <Menu></Menu>

    <p>Sanciones </p>

    <Textfield
      className="son-codigo"
      name="ID"
    />
    <MultipleSelect
      options={selectOptions}
      selectedOptions={selectedOptions}
      onChange={handleChange}
    />
     
     <Textfield
      className="son-codigo"
      name="Nueva Sancion"
    />



  </div>
);











}


