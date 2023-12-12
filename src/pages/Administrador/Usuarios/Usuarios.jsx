import React from 'react';
import Box from '@mui/material/Box';
import Menu from '../../../components/menu/Menu';
import NavTabs from '../../../components/NavTabs/NavTabs';
import './Usuarios.css';
import TablaUsuarios from '../../../components/TablaUsuarios/TablaUsuarios';

export default function Usuarios(){

    

    return (
        <Box sx={{   display: 'flex', 
        background:"#fff",
        alignItems:"space-between",
        flexDirection:"column",
        justifyContent:"center",
        width:"100%",
        height:"100vh"}}>
            <Menu />
            <div className='cajita'></div>
            <div className='caja-user'>  
            <TablaUsuarios />
            </div>
        </Box>
        
    );
};
