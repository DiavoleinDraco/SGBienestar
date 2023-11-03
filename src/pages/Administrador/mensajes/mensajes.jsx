import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Menu from '../../../components/menu/Menu';
import ComposeMessage from '../../../components/componentedeprueba/Redactar_mensaje';
import DataGridProDemo from '../../../components/Tablacorreos/Tablacorreos';
import './mensajes.css';

export default function Mensajes() {
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [composeSubject, setComposeSubject] = useState('');

  const handleComposeClick = () => {
    setIsComposeOpen(true);
    setComposeSubject('');
  };

  const handleSendMessage = (recipient, message) => {
    console.log(`Enviando mensaje a ${recipient} con asunto: ${composeSubject}`);
    console.log(`Mensaje: ${message}`);
  };

  return (
    <div className="mensajes-container">
      <Menu />
      <div className="center-content">
        <DataGridProDemo />
        <button onClick={handleComposeClick}>
          <ion-icon name="pencil"></ion-icon>Compose
        </button>
        {isComposeOpen && (
          <ComposeMessage
            onClose={() => setIsComposeOpen(false)}
            onSendMessage={handleSendMessage}
            initialSubject={composeSubject}
          />
        )}
      </div>
    </div>
  );
}
