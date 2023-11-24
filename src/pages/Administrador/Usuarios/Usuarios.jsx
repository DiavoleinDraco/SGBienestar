import React from 'react';
import Box from '@mui/material/Box';
import Menu from '../../../components/menu/Menu';
import NavTabs from '../../../components/NavTabs/NavTabs';
import './Usuarios.css';
import TablaUsuarios from '../../../components/TablaUsuarios/TablaUsuarios';

export default function Usuarios() {
    return (
        <Box>
            <Menu />
            <div className='cont-img'>
            </div>
            <div className="contenedor-title-usu">
            <h1 id='titulouser'>Apartado de<br
                /> Usuarios</h1>
            </div>
            <div className="cont-table-usuariuos">
                <TablaUsuarios />
            </div>
        </Box>

    );
};