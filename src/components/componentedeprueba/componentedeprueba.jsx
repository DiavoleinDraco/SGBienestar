import React, { useState } from 'react';
import './as.css';
import get, { getParametre, post } from "../../UseFetch.js";
import { Menu } from '@mui/material';

export default function ComposeBar({ onClose }) { // Define onClose como una prop
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');
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

  const handleDescartar = () => {
    setRecipient('');
    setMessage('');
    setSubject('');
    setIsComposeOpen(false);
    if (onClose) {
      onClose(); // Llama a la función onClose para cerrar la ventana en el componente Mensajes
    }
  }

  const handleGuardarComoBorrador = () => {
    // Realiza la lógica para guardar como borrador si es necesario
    setRecipient('');
    setMessage('');
    setSubject('');
    setIsComposeOpen(false);
    if (onClose) {
      onClose(); // Llama a la función onClose para cerrar la ventana en el componente Mensajes
    }
  }


  const handleSendMessage = () => {
    setIsLoading(true);
    post('/mail/admin', { mensaje: message, correo: recipient, asunto: subject })
      .then((response) => {
        console.log(message, recipient, subject);
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

  const closeComposeBar = () => {
    setIsComposeOpen(false);
    if (onClose) {
      onClose();
    }
    window.location.reload(); // Actualizar la página al cerrar la ventana emergente
  }

  return (
    <div className={`compose-bar ${isComposeOpen ? 'open' : 'closed'}`}>
      <div className="compose-controls">
        <input
          type="email"
          name="recipient"
          placeholder="Correo del destinatario"
          value={recipient}
          onChange={handleMessageChange}
          className="compose-input"
        />
        <input
          type="text"
          name="subject"
          placeholder="Asunto"
          value={subject}
          onChange={handleMessageChange}
          className="compose-input"
        />
        <button className="compose-button" onClick={handleSendMessage} disabled={isLoading || isMessageSent}>
          Enviar
        </button>
        <button className="compose-button" onClick={handleGuardarComoBorrador} disabled={isLoading || isMessageSent}>
          Guardar como borrador
        </button>
        <button className="compose-button" onClick={handleDescartar} disabled={isLoading || isMessageSent}>
          Descartar
        </button>
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
      <button className="compose-close-button" onClick={closeComposeBar}>Cerrar</button>
    </div>
  );
}