import React, { useState, useEffect } from "react";
import Menu from '../../components/menu/Menu';
import Box from '@mui/material/Box';
import Textfield from '../../components/Textfield/Textfield';
import ComSelect from '../../components/ComSelect/ComSelect';
import './Informes.css'
import Date from '../../components/Date/Date';
import NavTabs from '../../components/NavTabs/NavTabs';
import TablaInventario from '../../components/TablaInventario/TablaInventario';
import Buttons from '../../components/Buttons/Buttons';
import BasicAccordion from '../../components/BasicAccordion/BasicAccordion';
import get from "../../UseFetch";


export default function Informes () {
    const [opcionesComSelect, setOpcionesComSelect] = useState([]);

    const headerData = [
        [
          'Tipo de informe',
          'Fecha',
          'Numero de Informe',
          'Nombre del funcionario',
          'Documento de Identidad',
          'Dependencia u oficina',
          'Solicitud',
          'Implementos',
          'Descripcion',
        ],
      ];
    
      function handleGeneratePdf() {
        generatePdf(implementos, headerData);
      }
      
      function handleGenerateExcel() {
        generateExcel(implementos, headerData);
      }

    useEffect(() => {
        get("/implementos")
          .then((data) => {
            console.log("Datos de la API:", data);
      
            
            if (Array.isArray(data)) {
              
              const nombres = data.map((item) => item.nombre);
              setOpcionesComSelect(nombres);
            } else {
             
              console.warn("Los datos de la API encontrado");
              
            }
          })
          .catch((error) => {
            console.error("Error al obtener los datos de la API:", error);
          });
      }, []);


  const encabezadoInventario = () => (
    <div className='container-Informes'>
      <ComSelect nombre="Tipo de informe" items={["Informe del estado de los implementos", "Informe de implementos en mantenimiento", "informe de petición de nuevos implementos"]} />
      <Date Descripcion="Fecha" />
      <Textfield name="Numero de Informe" />
      <Textfield name="Nombre del funcionario" />
      <Textfield name="Documento de Identidad" />
      <Textfield name="Dependencia u oficina" />
      <ComSelect nombre="Solicitud" items={["Implementos en Uso", "Implementos en Mantenimiento", "Implementos Disponibles", "Implementos Solicitados"]} />
      <ComSelect nombre="Implementos" items={["Implementos del Gimnasio", "Implementos Deportivos", "Implementos del Gimnasio y Deportivos"]} />
      <ComSelect nombre="Descripcion" items={["Estado", "Solicitud", "En prestamo", "En mantenimiento"]} />
    </div>
  );

  

  const encabezadoContent = encabezadoInventario();

    const tabs = [
        {
          label: 'Informes de implementos',
          value: '1',
          content: <div className='container-Informes'>
          <ComSelect
              nombre="Tipo de informe"
              items={[
                "Informe del estado de los implementos",
                "Informe de implementos en mantenimiento",
                "Informe de petición de nuevos implementos",
              ]}
            />
    
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <p>Fecha</p> 
                <Date Descripcion="" />
                </div>
             
             <div style={{ display: 'flex', alignItems: 'center' }}>
                <p>Numero de Informe</p> 
                <Textfield name="" />
                </div>
    
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <p>Nombre del Funcionario</p> 
                <Textfield name="" />
                </div>
    
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <p>Documento de Identidad</p> 
                <Textfield name="" />
                </div>
    
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <p>Dependencia u oficina</p> 
                <Textfield name="" />
                </div>
    
            
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <p>Detalle del Informe </p> 
                <ComSelect
              nombre=""
              items={[
                "Implementos en Uso",
                "Implementos en Mantenimiento",
                "Implementos Disponibles",
                "Implemento Solicitados",
              ]}
            />
            </div>
        
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <p>Implementos</p> 
                <ComSelect
              nombre=""
              items={[
                "del Gimnasio",
                "Deportivos",
                "del Gimnasio y Deportivos",
              ]}
            />
            </div>
    
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <p>Descripcion</p> 
                <ComSelect
              nombre=""
              items={[
                "Solicitado", 
                "En préstamo", 
                "En mantenimiento"
              ]}
            />
            </div>
    
            <div style={{ display: 'flex', alignItems: 'center' }}>
             <p>Cantidad</p> 
            <Textfield name="" />
          </div>
    
          <BasicAccordion  
      titulo="Informacion Adicional"
      contenido={
        <>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p>Nombre del Implemento</p> 
            <ComSelect
              nombre=""
              items={opcionesComSelect}
            />
            <p>Unidades</p>
            <Textfield name="" />
            <p>Caracteristicas</p>
            <Textfield name="" />
          </div>
    
          <div style={{ display: 'flex', alignItems: 'center' }}>
            
            <ComSelect
              nombre=""
              items={opcionesComSelect}
            />
            <Textfield name="" />
            <Textfield name="" />
          </div>
    
          <div style={{ display: 'flex', alignItems: 'center' }}>
            
            <ComSelect
              nombre=""
              items={opcionesComSelect}
            />
            <Textfield name="" />
            <Textfield name="" />
          </div>
    
          <div style={{ display: 'flex', alignItems: 'center' }}>
            
            <ComSelect
              nombre=""
              items={opcionesComSelect}
            />
            <Textfield name="" />
            <Textfield name="" />
          </div>
    
          
        </>
      }
    /> 
    </div>
        },
        {
          label: 'Informes de inventario',
          value: '2',
          content: [
            encabezadoContent,
            <TablaInventario key="tabla-inventario" />,
          ],
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