import React from 'react';
import Box from '@mui/material/Box';
import Menu from '../../../components/menu/Menu';
import'./Inventario.css';
import TablaInventario from '../../../components/TablaInventario/TablaInventario';

export default function Inventario(){
    return (
        <Box sx={{ 
        display: 'flex', 
        background:"#fff",
        alignItems:"space-around",
        flexDirection:"column",
        width:"100%",
        height:"100vh"}}>
            <Menu />
            <div className='cajita'></div>
            <TablaInventario />
            
       
        </Box>
    )
}