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


export default function Informes () {
    const [opcionesComSelect, setOpcionesComSelect] = useState([]);
    const [tipo, setTipo] = useState([]);
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

    console.log('informedata', informeData)

    useEffect(() => {
        get("/tipo-informe")
        .then((data) => {
          setTipo(data);
        })
        .catch((error) => {
          console.error("Error al encontrart el resultado", error);
        });
    }, []);

    const handleTipoInformeFormit = (selectedTipo) => {
      const selectedTipoInformeOption = selectedMarcaInfo.find(
        (option) => option.label === selectedTipo
      );

      if(selectedTipoInformeOption) {
        const selectedInfoTipo = selectedTipoInformeOption.value;
        const updateInfo = {
          ...informeData, tipoInforme: selectedInfoTipo
        }
        setInformeData(updateInfo)
      }
    }

    const selectedMarcaInfo = tipo.map((tipo) => ({
      label: tipo.nombre,
      value: tipo['_id']
    }))
  

  const encabezadoImplemento = () => (
    <div className='container-Informes'>
      <ComSelect
        nombre="Tipo de informe"
        items={selectedMarcaInfo.map((opcion) => opcion.label)}
        onChange={(value) => handleTipoInformeFormit(value)}
        getOptionLabel={(option) => option.label}
        value={setTipo}
      />
      <Textfield 
      name="Nombre del Funcionario" 
      onChange={(value) => handleInformeDataChange("nombreFuncionario", value)}
      />
      <Textfield 
      name="Dependencia" 
      onChange={(value) => handleInformeDataChange("dependencia", value)}
      />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p>Observaciones</p>
        <TextField name="" onChange={(value) => handleInformeDataChange("dependencia", value)}/>
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
  
  
  const encabezadoContentImplemento = encabezadoImplemento();

    const tabs = [
        {
          label: 'Informes de Nuevos Implementos',
          value: '1',
          content: [encabezadoContentImplemento,
            <BasicAccordion
            titulo="Informacion de Nuevos Implementos"
            contenido={
              <>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <p>Nombre del Implemento</p>
                  <Textfield
                    nombre="nombreImple"
                    onChange={(value) => handleInformeDataChange("infoAdicional", value, 0,"nombreImple")}
                  />
                  <p>Unidades</p>
                  <Textfield
                    name="unidades"
                    onChange={(value) => handleInformeDataChange("infoAdicional", value, 0, "unidades")}
                  />
                  <p>Caracteristicas</p>
                  <Textfield
                    name="caracteristicas"
                    onChange={(value) => handleInformeDataChange("infoAdicional", value, 0, "caracteristicas")}
                  />
                </div>
          
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <p>Nombre del Implemento</p>
                  <Textfield
                    nombre="nombreImple"
                    key={'nombreImple'}
                    onChange={(value) => handleInformeDataChange("infoAdicional", value, 1,"nombreImple")}
                  />
                  <Textfield
                    name="unidades"
                    key={'unidades'}
                    onChange={(value) => handleInformeDataChange("infoAdicional", value, 1, "unidades")}
                  />
                  <Textfield
                    name="caracteristicas"
                    key={'caracteristicas'}
                    onChange={(value) => handleInformeDataChange("infoAdicional", value, 1, "caracteristicas")}
                  />
                </div>
              
                    
                  </>
                }
              /> ]
        },
      ];



    return (
      <Box sx={{ display: 'block', position: 'relative', left: '200px'}}>
        <Menu />
        <h1>Apartado de informes</h1>
        <NavTabs tabs={tabs}/>
      </Box>
    );
};