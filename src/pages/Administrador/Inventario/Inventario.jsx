import React from 'react';
import Box from '@mui/material/Box';
import Menu from '../../../components/menu/Menu';
import'./Inventario.css';
import TablaInventario from '../../../components/TablaInventario/TablaInventario';

export default function Inventario(){
    return (
        <Box sx={{ margin:"85px 0px", 
        display: 'flex',
        flexDirection:"column", 
        background:"grey",
        alignItems:"center",
        width:"100%",
        height:"95vh"}}>
            <Menu />
            <div className='cont-inventario'>
            <h1 className='titulo-inv'>Inventario</h1>
            </div>
            <TablaInventario />
        </Box>
    )
}