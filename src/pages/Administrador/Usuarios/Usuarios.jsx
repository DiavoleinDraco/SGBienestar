import React from 'react';
import Box from '@mui/material/Box';
import Menu from '../../../components/menu/Menu';
import NavTabs from '../../../components/NavTabs/NavTabs';
import './Usuarios.css';
import TablaUsuarios from '../../../components/TablaUsuarios/TablaUsuarios';

export default function Usuarios(){

    

    return (
        <Box sx={{  background:"#e4e7e4",height:"94vh",width:"95% ", borderRadius:"10px", margin:"70px auto 2px ",flexDirection:"column", display: 'flex',justifyContent:"SPACE-EVENLY", position: 'relative', left: '2%'}}>
            <Menu />
            <h1 id='titulouser'>Apartado de Usuarios<svg xmlns="http://www.w3.org/2000/svg" width="26" height="156" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
</svg></h1>
<TablaUsuarios />
        </Box>
        
    );
};