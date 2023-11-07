import React, { useEffect, useState } from 'react';
import './Redactar_mensaje.css';
import get, { getParametre, post } from "../../UseFetch.js";
import { Autocomplete } from '@mui/material';



export default function ComposeBar({
  onClose,
  style = 'redaccion-correo',
  showRecipientInput = false,
  showAsunto = false, // Nueva prop para controlar la visibilidad del campo "Asunto"
  recipient: initialRecipient = '',
  endpoint = '/mail/admin'
}) {
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState(initialRecipient);
  const [subject, setSubject] = useState('');
  const [isComposeOpen, setIsComposeOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isMessageSent, setIsMessageSent] = useState(false);

  


  const handleMessageChange = (e) => {
    const { name, value } = e.target;
    if (name === 'recipient') {
      setRecipient(value);
    } else if (name === 'message') {
      setMessage(value);
    } else if (name === 'subject') {
      setSubject(value);
    }
  }


  const handleDescartar = async () => {

    if (onClose) {
      onClose();
    } 
    setIsComposeOpen(false);
  }

  const handleSendMessage = () => {
    // Verificar si alguno de los campos está vacío
    if (!recipient || !message || !subject) {
      alert('Por favor, completa todos los campos antes de enviar el mensaje.');
      return;
    }
  
    setIsLoading(true);
    post(endpoint, { mensaje: message, correo: recipient, asunto: subject })
      .then((response) => {
        alert('Mensaje enviado a ' + recipient + ': ' + message);
        setIsMessageSent(true);
        closeComposeBar();
      })
      .catch((error) => {
        console.error('Error al enviar el mensaje:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  const handleUsuario = (value) => {
    console.log(value)
  }
  const closeComposeBar = () => {
    setIsComposeOpen(false);
    if (onClose) {
      onClose();
    }
    window.location.reload();
  }


  return (

    <div className={`compose-bar ${style} ${isComposeOpen ? 'open' : 'closed'}`}>

      <div className="compose-controls">
        {showRecipientInput && (
          <input
            type="email"
            name="recipient"
            placeholder="Correo del destinatario"
            value={recipient}
            onChange={handleMessageChange}
            className="compose-input"
          />
        )}
        {showAsunto && (
          <input
            type="text"
            name="subject"
            placeholder="Asunto"
            value={subject}
            onChange={handleMessageChange}
            className="compose-input"
          />
        )}
        <button className="compose-button" onClick={handleSendMessage} disabled={isLoading || isMessageSent}>
          Enviar
        </button>
        {onClose && ( // Solo muestra el botón "Descartar" si se proporciona la función "onClose"
          <button className="compose-button" onClick={handleDescartar} disabled={isLoading || isMessageSent}>
            Descartar
          </button>
        )}
      </div>
      {isLoading && <p>Enviando mensaje...</p>}
      {isMessageSent && <p>Mensaje enviado con éxito.</p>}
      <textarea
        name="message"
        className="compose-textarea"
        placeholder="Escribe tu mensaje..."
        value={message}
        onChange={handleMessageChange}
      ></textarea>
    </div>
  );
}
