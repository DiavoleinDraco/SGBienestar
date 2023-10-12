import React, { useState } from 'react';
import './as.css';
import get, { getParametre, post } from "../../UseFetch.js";

export default function ComposeBar() {
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');

  const handleMessageChange = (e) => {
    const { name, value } = e.target;
    if (name === 'recipient') {
      setRecipient(value);
    } else if (name === 'message') {
      setMessage(value);
    }
  }
  

  const handleSendMessage = () => {
    post('/mail',{mensaje:message, correo: recipient})
    console.log(message,recipient)
    alert('Mensaje enviado a ' + recipient + ': ' + message);
    setRecipient('');
    setMessage('');
  }

  return (
    <div className="compose-bar">
      <div className="compose-controls">
        <input
          type="email"
          name="recipient"
          placeholder="Correo del destinatario"
          value={recipient}
          onChange={handleMessageChange}
          className="compose-input"
        />
        <button className="compose-button" onClick={handleSendMessage}>Enviar</button>
        <button className="compose-button">Guardar como borrador</button>
        <button className="compose-button">Descartar</button>
      </div>
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
