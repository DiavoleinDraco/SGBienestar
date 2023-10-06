import React from 'react';
import Box from '@mui/material/Box';
import Menu from '../../components/menu/Menu';
import NavTabs from '../../components/NavTabs/NavTabs';

export default function Usuarios(){
    return (
        <Box sx={{ display: 'block', position: 'relative', left: '200px'}}>
            <Menu />
            <h1>Apartado de usuarios</h1>
            <NavTabs />
        </Box>
        
    )
}