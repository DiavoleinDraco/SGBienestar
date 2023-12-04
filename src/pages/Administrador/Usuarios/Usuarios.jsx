import React from 'react';
import Box from '@mui/material/Box';
import Menu from '../../../components/menu/Menu';
import NavTabs from '../../../components/NavTabs/NavTabs';
import './Usuarios.css';
import TablaUsuarios from '../../../components/TablaUsuarios/TablaUsuarios';

export default function Usuarios(){

    

    return (
        <Box sx={{  background:"#e4e7e4",height:"100vh",width:"100% ", borderRadius:"10px", margin:"1px auto 2px ",flexDirection:"column", display: 'flex',justifyContent:"center",alignItems:"center"}}>
            <Menu />
            <TablaUsuarios />
        </Box>
        
    );
};
