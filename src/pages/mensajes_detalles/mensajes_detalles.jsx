import React from 'react';
import Box from '@mui/material/Box';
import Menu from '../../components/menu/Menu';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import './mensajes_detallas.css';

export default function MensajesDetalle() {
  return (

    <Box sx={{ display: 'flex',position: 'relative', left: '', top: "100px"}}>
    <Menu></Menu>
      <div className="mensajes-detalle-container">

      <div className="mensajes-detalle-header">
  <IconButton onClick={() => {}}>
    <ArrowBackIcon />
  </IconButton>
  <IconButton onClick={() => {}}>
    <DeleteIcon />
  </IconButton>
</div>


      <div className="mensajes-detalle-content">
    <h1>Hola</h1>
      </div>
    </div>    
    </Box>
  );
}
