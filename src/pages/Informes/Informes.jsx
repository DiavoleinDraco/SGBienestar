import Menu from '../../components/menu/Menu';
import Box from '@mui/material/Box';
import Textfield from '../../components/Textfield/Textfield';
import ComSelect from '../../components/ComSelect/ComSelect';
import './Informes.css'
import Date from '../../components/Date/Date';
import NavTabs from '../../components/NavTabs/NavTabs';



export default function Informes () {



return (
    <Box sx={{ display: 'block', position: 'relative', left: '200px'}}>
            <Menu />
            <h1>Apartado de informes</h1>
         
        <div className='container-Informes' >
            <ComSelect 
            nombre="Tipo de informe"
            items={["Informe del estado de los implementos", "Informe de implementos en mateniemiento", "informe de peticion de nuevo implementos"]}
            />

            <Date
             Descripcion="Fecha"
            />  

            <Textfield 
             name="Numero de Informe"
            />

            <Textfield 
             name="Nombre del funcionario"
            />

            <Textfield 
             name="Documento de Identidad"
            />

            <Textfield 
             name="Dependencia u oficina"
            />

            <ComSelect 
            nombre="Solicitud"
            items={["Implementos en Uso", "Implementos en Mantenimiento", "Implementos Disponibles", "Implemento Solicitados"]}
            />

            <ComSelect 
            nombre="Implementos"
            items={["Implementos del Gimasion ", "Implementos de Deportivos", "Implementos del Ginmasion y Deportivos "]}
            />

            <ComSelect 
            nombre="Descripcion"
            items={["Estado", "Solicitud", "En prestamo", "En mantenimiento"]}
            />

        </div>





  </Box>
)


} 