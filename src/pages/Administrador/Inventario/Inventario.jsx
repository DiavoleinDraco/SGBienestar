import React from 'react';
import Box from '@mui/material/Box';
import Menu from '../../../components/menu/Menu';
import TablaInvenatario from '../../../components/TablaInventario/TablaInventario';

export default function Inventario(){
    return (
        <Box sx={{ display: 'block', position: 'relative', left: '200px'}}>
            <Menu />
            <h1>Inventario</h1>
            <TablaInvenatario />
        </Box>
    )
}