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
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';


export default function Informes () {
    const [opcionesComSelect, setOpcionesComSelect] = useState([]);
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

  const encabezadoImplemento = () => (
    <div className='container-Informes'>
      <ComSelect
        nombre="Tipo de informe"
        items={[
          "Informe del estado de los implementos",
          "Informe de implementos en mantenimiento",
          "Informe de petición de nuevos implementos",
        ]}
        onChange={(value) => handleInformeDataChange("tipoInforme", value)}
      />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p>Fecha</p> 
        <Date 
          Descripcion="" 
          onChange={(value) => handleInformeDataChange("fecha", value)}
        />
      </div>
             
             <div style={{ display: 'flex', alignItems: 'center' }}>
                <p>Numero de Informe</p> 
                <Textfield name="" onChange={(value) => handleInformeDataChange("numeroInforme", value)}/>
                </div>
    
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <p>Nombre del Funcionario</p> 
                <Textfield name="" onChange={(value) => handleInformeDataChange("nombreFuncionario", value)}/>
                </div>
    
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <p>Documento de Identidad</p> 
                <Textfield name="" onChange={(value) => handleInformeDataChange("docIdentidad", value)}/>
                </div>
    
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <p>Dependencia u oficina</p> 
                <Textfield name="" onChange={(value) => handleInformeDataChange("dependencia", value)}/>
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
              onChange={(value) => handleInformeDataChange("detalleInforme", value)}
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
              onChange={(value) => handleInformeDataChange("implementos", value)}
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
              onChange={(value) => handleInformeDataChange("descripcion", value)}
            />
            </div>
    
            <div style={{ display: 'flex', alignItems: 'center' }}>
             <p>Cantidad</p> 
            <Textfield name="" onChange={(value) => handleInformeDataChange("cantidad", value)}/>
          </div>
    
          <BasicAccordion
  titulo="Informacion Adicional"
  contenido={
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p>Nombre del Implemento</p>
        <ComSelect
          nombre="nombreImple"
          items={opcionesComSelect}
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
        <ComSelect
          nombre="nombreImple"
          key={'nombreImple'}
          items={opcionesComSelect}
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
    /> 
    <Buttons nombre={'DESCARGAR PDF'} onclick={generatePdfInformeImplemento} />
        <Buttons nombre={'DESCARGAR EXCEL'} onclick={generateExcelInformeImplemento} />
    
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
  
  
  
  
  
  function generatePdfInformeImplemento() {
    const doc = new jsPDF();
    let y = 10; // Coordenada vertical inicial
  
    const campos = [
      "Tipo de informe",
      "Fecha",
      "Numero de Informe",
      "Nombre del Funcionario",
      "Documento de Identidad",
      "Dependencia u oficina",
      "Detalles de Informe",
      "Implementos",
      "Descripción",
      "Cantidad",
    ];
  
    // Objeto que mapea nombres de campos en blanco a claves en informeData
    const campoKeyMapping = {
      "Tipo de informe": "tipoInforme",
      "Fecha": "fecha",
      "Numero de Informe": "numeroInforme",
      "Nombre del Funcionario": "nombreFuncionario",
      "Documento de Identidad": "docIdentidad",
      "Dependencia u oficina": "dependencia",
      "Detalles de Informe": "detalleInforme",
      "Implementos": "implementos",
      "Descripción": "descripcion",
      "Cantidad": "cantidad",
    };
  
    campos.forEach((campo) => {
      const campoKey = campoKeyMapping[campo]; // Buscar la clave en informeData
      const valor = informeData[campoKey];
      if (campoKey && valor !== undefined) {
        doc.text(`${campo}: ${valor}`, 10, y);
      } else {
        doc.text(`${campo}:`, 10, y); // Si no se encuentra o es "undefined", imprimir solo el nombre del campo
      }
      y += 10;
    });
  
    if (informeData.infoAdicional.length > 0) {
      doc.text("Información Adicional:", 10, y);
      y += 10;
    }
  
    // Campos de Informacion Adicional
    informeData.infoAdicional.forEach((conjunto, index) => {
      const nombreImple = conjunto.nombreImple;
      const unidades = conjunto.unidades;
      const caracteristicas = conjunto.caracteristicas;
  
      if (nombreImple || unidades || caracteristicas) {
        doc.text(`Conjunto ${index + 1}:`, 20, y);
        y += 10;
  
        if (nombreImple !== undefined) {
          doc.text(`Nombre del Implemento: ${nombreImple}`, 20, y);
          y += 10;
        }
  
        if (unidades !== undefined) {
          doc.text(`Unidades: ${unidades}`, 20, y);
          y += 10;
        }
  
        if (caracteristicas !== undefined) {
          doc.text(`Caracteristicas: ${caracteristicas}`, 20, y);
          y += 10;
        }
      }
    });
  
    doc.save('informe_implementos.pdf');
  }
  
  
  

  function generateExcelInformeImplemento() {
    const ws = XLSX.utils.json_to_sheet([
      {
        "Tipo de informe": informeData.tipoInforme,
        "Fecha": informeData.fecha,
        "Numero de Informe": informeData.numeroInforme,
        "Nombre de Funcionario": informeData.nombreFuncionario,
        "Documento de Identidad": informeData.docIdentidad,
        "Detalles": informeData.dependencia,
        "Detalles de Informe": informeData.detalleInforme,
        "Implementos": informeData.implementos,
        "Descripción": informeData.descripcion,
        "Cantidad": informeData.cantidad,
        "Informacion adicional": informeData.infoAdicional,
      }
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Informe_Implementos');
    XLSX.writeFile(wb, 'informe_implementos.xlsx');
  }
  

  const encabezadoContent = encabezadoInventario();
  const encabezadoContentImplemento = encabezadoImplemento();

    const tabs = [
        {
          label: 'Informes de implementos',
          value: '1',
          content: encabezadoContentImplemento,
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
