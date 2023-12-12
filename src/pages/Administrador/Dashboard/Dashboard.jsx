import React from 'react';
import Box from '@mui/material/Box';
import Menu from '../../../components/menu/Menu';
import "./Dashboard.css";
import aprendizes from "./Aprendizes.jpeg";

export default function Dashboard(){
    return (
        <Box>
            <Menu />
            <div className="fondo">
            </div>
            <div className="contenedor-img-admin">
                <img src={aprendizes} alt="Imagen de aprendizes" />
            </div>
            <div className="contenedor-horario">
            </div>
            <div className="contenedor-video">
            </div>
        </Box>
        
    )
}