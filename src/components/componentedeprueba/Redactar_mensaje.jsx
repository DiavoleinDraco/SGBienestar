import React, { useEffect, useState } from 'react';
import './Redactar_mensaje.css';
import get, { post } from "../../UseFetch.js";
import MultipleSelect from '../MultipleSelect/MultipleSelect.jsx';

export default function ComposeBar({
  onClose,
  style = 'redaccion-correo',
  showRecipientInput = false,
  showAsunto = false,
  showChecklist = true,
  defaultRecipient = [''], // Nueva prop para el destinatario por defecto
  recipient: initialRecipient = '',
  endpoint = '/mail/admin',
  defaultAsunto = "",
  showEnviarButton = true,
  onEnviarClick
}) {
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState(defaultRecipient || initialRecipient); // Usar defaultRecipient si está presente
  const [subject, setSubject] = useState(defaultAsunto);
  const [isComposeOpen, setIsComposeOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [data, setData] = useState([]);

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };



  const handleTodosClick = () => {
    if (showRecipientInput) {
      const allRecipientEmails = data.map((item) => item.correo_inst);
      setRecipient(allRecipientEmails);
    }
  };

  const handleMessageChange = (e) => {
    const { name, value } = e.target;
    if (name === 'recipient') {
      setRecipient(value);
    } else if (name === 'message') {
      setMessage(value);
    } else if (name === 'subject') {
      setSubject(value);
    }
  };

  useEffect(() => {
    try {
      get("/registro/info").then((response) => setData(response))
    } catch (error) {
      console.error(error)
    }

    // Verificar si hay un destinatario por defecto y establecerlo
    if (defaultRecipient) {
      setRecipient(defaultRecipient);
    }
  }, [defaultRecipient]);

  const selectOptions = [
    { value: "opcion1", label: "ginzu200@gmail.com" },
    { value: "opcion2", label: "Daño del implemento deportivo" },
    {
      value: "opcion3",
      label: "Faltas recurrentes por la entrega tardía del implemento",
    },
    { value: "opcion4", label: "Uso indebido de la plataforma de préstamos" },
    { value: "opcion5", label: "Faltas reiterativas de las normas de uso" },
  ];

  const handleDescartar = async () => {
    if (onClose) {
      onClose();
    }
    setIsComposeOpen(false);
  }

  const handleSendMessage = () => {
    console.log({ mensaje: message, correo: recipient, asunto: subject })
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
    const selectedValues = value.map((item) => item.value);
    const uniqueSelectedValues = selectedValues.filter((value) => !recipient.includes(value));
    setRecipient((prevRecipient) => [...prevRecipient, ...uniqueSelectedValues]);
    setSelectedOptions(value);
  };

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
          <MultipleSelect
            options={data && data.map((item) => ({ value: item.correo_inst, label: item.correo_inst }))}
            selectedOptions={selectedOptions}
            onChange={handleUsuario}
            className="custom-multiple-select"
          />
        )}
        {showChecklist && (
          <>
            <input
              type="checkbox"
              onClick={handleTodosClick}
            /> Todos
          </>
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
        <textarea
          name="message"
          className="compose-textarea"
          placeholder="Escribe tu mensaje..."
          value={message}
          onChange={handleMessageChange}
        ></textarea>
        <div className='cont-botton'>
          <button
            className="compose-button"
            onClick={() => {
              if (onEnviarClick) {
                onEnviarClick({ mensaje: message, correo: recipient, asunto: subject });
              } else {
                handleSendMessage();
              }
            }}
            disabled={isLoading || isMessageSent}
            style={{ display: showEnviarButton ? 'inline-block' : 'none' }}
          >
            Enviar
          </button>
          {onClose && (
            <button className="compose-button" onClick={handleDescartar} disabled={isLoading || isMessageSent}>
              Descartar
            </button>
          )}
        </div>
      </div>
      {isLoading && <p>Enviando mensaje...</p>}
      {isMessageSent && <p>Mensaje enviado con éxito.</p>}
    </div>
  );
}
