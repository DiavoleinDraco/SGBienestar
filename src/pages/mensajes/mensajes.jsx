import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Menu from '../../components/menu/Menu';
import NavTabs from '../../components/NavTabs/NavTabs';
import { Button } from '@react-email/button';
import { Container } from '@react-email/container';
import  './mensajes.css'
import ComposeMessage from '../../components/componentedeprueba/componentedeprueba';
import Buttons from '../../components/Buttons/Buttons';

export default function Mensajes(){
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [composeSubject, setComposeSubject] = useState(''); // Estado para el asunto

  const handleComposeClick = () => {
    setIsComposeOpen(true);
    setComposeSubject(''); // Limpia el asunto cuando se abre ComposeMessage
  };

  const handleSendMessage = (recipient, message) => {
    // Aquí puedes enviar el mensaje o realizar cualquier otra lógica
    console.log(`Enviando mensaje a ${recipient} con asunto: ${composeSubject}`);
    console.log(`Mensaje: ${message}`);
  };
   const realizarInicioSesion = () => {
    if(decodeToken.privilegio >= 3){
      navegacion("/admin")
    }else{
      console.log('Nivel de acceso invalido')
    }

  };


    return (
        <Box sx={{ display: 'block', position: 'relative', left: '200px'}}>
           
            <Container>
           
          <button onClick={handleComposeClick}>
          <ion-icon name="pencil"></ion-icon>Compose
        </button>
        {isComposeOpen && (
  <ComposeMessage
    onClose={() => setIsComposeOpen(false)} // Configura onClose para cerrar la ventana en Mensajes
    onSendMessage={handleSendMessage}
    initialSubject={composeSubject}
  />
)}

           
    </Container>
        </Box>
        
    )
}