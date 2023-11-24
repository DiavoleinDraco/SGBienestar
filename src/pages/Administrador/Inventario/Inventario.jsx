import React from 'react';
import Box from '@mui/material/Box';
import Menu from '../../../components/menu/Menu';
import'./Inventario.css';
import TablaInventario from '../../../components/TablaInventario/TablaInventario';

export default function Inventario(){
    return (
        <Box sx={{ margin:"90px auto", 
        display: 'flex',
        flexDirection:"column", 
        position: 'relative', 
        left: '20px',
        background:"grey",
        alignItems:"center",
        width:"90%",
        height:"90vh"}}>
            <Menu />
            <div className='cont-inventario'>
            <h1>Inventario</h1>
            </div>
            <TablaInventario />
        </Box>
    )
}