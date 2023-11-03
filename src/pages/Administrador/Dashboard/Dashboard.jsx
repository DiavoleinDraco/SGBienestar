import React from 'react';
import Box from '@mui/material/Box';
import Menu from '../../../components/menu/Menu';

export default function Dashboard(){
    return (
        <Box sx={{ display: 'block', position: 'relative', left: '200px'}}>
            <Menu />
            <h1>Bienvenidos???</h1>
        </Box>
        
    )
}