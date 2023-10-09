import React from 'react';
import Box from '@mui/material/Box';
import Menu from '../../components/menu/Menu';
import NavTabs from '../../components/NavTabs/NavTabs';
import TablaUsuarios from '../../components/TablaUsuarios/TablaUsuarios';

export default function Usuarios(){

    const tabs = [
        {
          label: 'Usuarios',
          value: '1',
          content: <TablaUsuarios />,
        },
        {
          label: 'Historial de sanciones',
          value: '2',
          content: 'Aquí van las sanciones',
        },
        {
          label: 'No sé',
          value: '3',
          content: 'Aquí no sé',
        },
      ];

    return (
        <Box sx={{ display: 'block', position: 'relative', left: '200px'}}>
            <Menu />
            <h1>Apartado de usuarios</h1>
            <NavTabs tabs={tabs}/>
        </Box>
        
    )
}