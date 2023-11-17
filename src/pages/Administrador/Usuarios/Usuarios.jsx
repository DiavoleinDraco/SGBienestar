import React from 'react';
import Box from '@mui/material/Box';
import Menu from '../../../components/menu/Menu';
import NavTabs from '../../../components/NavTabs/NavTabs';
import './Usuarios.css';
import useer from "../Usuarios/admin.png";
import TablaUsuarios from '../../../components/TablaUsuarios/TablaUsuarios';

export default function Usuarios(){
    return (

        <Box sx={{ height:"92vh",width:"95%",background:"white",display:'flex',justifyContent:"CENTER",borderRadius:"10px",flexWrap:"wrap", margin:"98px auto 0%",position: 'relative', left: '2%'}}>
            <Menu />
            <div className='cont-img'>
              <img className='imagen-user' src={useer} alt="" />      
           </div>
              <h1 id='titulouser'>Apartado de <br
              /> Usuarios</h1>
           <TablaUsuarios />
        </Box>
       
    );
};