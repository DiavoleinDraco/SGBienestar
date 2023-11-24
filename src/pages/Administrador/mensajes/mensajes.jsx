import React, { useState } from 'react';
import Box from '@mui/material/Box';
import DataGridProDemo from '../../../components/Tablacorreos/Tablacorreos';
import './mensajes.css';
import Comentarioas from '../../../components/Comentarios/comentarios';
import ComposeBar from '../../../components/componentedeprueba/Redactar_mensaje';
import NavTabs from '../../../components/NavTabs/NavTabs';
import Menu from '../../../components/menu/Menu';
import { Transform } from '@material-ui/icons';
import { Translate } from '@mui/icons-material';
import mensajes from "../Sanciones/png.jpg"

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',

  alignItems: 'center',
  // Espacio en la parte superior

  overflowX: 'hidden', // Bloquear el scroll horizontal
  position: 'relative', // Añade posición relativa al contenedor
};

const composeButtonStyle = {
  zIndex: '100%',
};


export default function Mensajes() {
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [composeSubject, setComposeSubject] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleComposeClick = () => {
    setIsComposeOpen(true);
    setComposeSubject('');
  };
  const handleComposeOpen = () => {
    setIsComposeOpen(true);

  };

  const handleComposeClose = () => {
    setIsComposeOpen(false);
  };

  const handleSendMessage = (recipient, message) => {
    console.log(`Enviando mensaje a ${recipient} con asunto: ${composeSubject}`);
    console.log(`Mensaje: ${message}`);
  };
  const tabs = [
    {
      label: 'Enviados',
      value: '1',
      content: <DataGridProDemo Delete="/mail/mail/" Consulta="/mail" />
    },
    {
      label: 'Recibidos',
      value: '2',
      content: <DataGridProDemo Delete="/mail/comentario/" Consulta="/mail/comentario" />
    },

  ];

  return (
    
    <div style={containerStyle} className="mensajes-container">
       <Menu></Menu>
      <div className='cont-mensaje'>
        <h1 className='titulo-mesajes'>Apartado de <br /> mensajes</h1>
      </div>
     <div className='cont-tablemsg'>
     <NavTabs tabs={tabs} />

     </div>
    
      <button className='comp' style={composeButtonStyle} onClick={handleComposeClick}>
        <i class="bi bi-send-plus"></i><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-send-plus" viewBox="0 0 16 16">
          <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372l2.8-7Zm-2.54 1.183L5.93 9.363 1.591 6.602l11.833-4.733Z" />
          <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5Z" />
        </svg>
      </button>
      {isComposeOpen && (
        <ComposeBar
          onClose={handleComposeClose}
          showRecipientInput={true}
          endpoint="/mail/admin"
          style="redaccion-correo"
          showAsunto={true}
        />
      )}
    </div>
  );
}