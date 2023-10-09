import Menu from '../../components/menu/Menu';
import Box from '@mui/material/Box';
import Textfield from '../../components/Textfield/Textfield';
import ComSelect from '../../components/ComSelect/ComSelect';
import './Informes.css'
import Date from '../../components/Date/Date';
import NavTabs from '../../components/NavTabs/NavTabs';
import TablaInventario from '../../components/TablaInventario/TablaInventario';
import Buttons from '../../components/Buttons/Buttons';


export default function Informes () {

  const encabezado = () => (
    <div className='container-Informes' >
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

  const encabezadoContent = encabezado();

    const tabs = [
        {
          label: 'Informes de implementos',
          value: '1',
          content: encabezadoContent,
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
        <Buttons onClick={handleGeneratePdf} nombre={'Descargar PDF'}/>
<Buttons onClick={handleGenerateExcel} nombre={'Descargar EXCEL'}/>
      </Box>
    );
};