import React, { useState } from 'react';
import Box from '@mui/material/Box';
import DataGridProDemo from '../../../components/Tablacorreos/Tablacorreos';
import './mensajes.css';
import Comentarioas from '../../../components/Comentarios/comentarios';
import ComposeBar from '../../../components/componentedeprueba/Redactar_mensaje';
import NavTabs from '../../../components/NavTabs/NavTabs';
import Menu from '../../../components/menu/Menu';

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
      content:  <DataGridProDemo Delete="/mail/mail/" Consulta="/mail" />
    },
    {
      label: 'Recibidos',
      value: '2',
      content:  <DataGridProDemo Delete="/mail/comentario/" Consulta="/mail/comentario" />
    },
    {
      label: 'No sé',
      value: '3',
      content: 'Aquí no sé',
    },
  ];
  
  return (
    <div className="mensajes-container">
      <Menu></Menu>
      <div className="center-content">
      <NavTabs tabs={tabs}/>
        <button onClick={handleComposeClick}>
          <ion-icon name="pencil"></ion-icon>Compose
        </button>
        {isComposeOpen && (
          <ComposeBar
          onClose={handleComposeClose}
           showRecipientInput={true} // Muestra el campo de correo
          endpoint="/mail/admin"
           style="redaccion-correo"// Enlace de la petición personalizado
           showAsunto={true}
/>

        )}
      </div>
      <Comentarioas>Hola</Comentarioas>

      <input
          type="text"
          placeholder="Mensaje"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        />
    </div>
  );
}
