import React, { useState } from 'react';
import Popper from '@mui/material/Popper';
import Button from '@mui/material/Button';
import { Close, Message } from '@mui/icons-material';
import ComposeBar from '../componentedeprueba/Redactar_mensaje';
import Checkbox from '@mui/material/Checkbox';
import './comentarios.css';
import jwtDecode from 'jwt-decode';

export default function Comentarioas() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anonimo, setAnonimo] = useState(false);
  const token = localStorage.getItem('token')
  const decode = jwtDecode(token)
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleAnonimoChange = () => {
    setAnonimo(!anonimo);
  };

  return (
    <div>
      <Button aria-describedby={open ? 'popper' : undefined} onClick={handleClick}>
        <div className="custom-icon-container">
          <Message /> {/* Muestra el ícono de mensaje */}
        </div>
      </Button>
      <Popper
        id={open ? 'popper' : undefined}
        open={open}
        anchorEl={anchorEl}
        placement="top"
        disablePortal={false}
        modifiers={[
          {
            name: 'flip',
            enabled: false,
            options: {
              altBoundary: false,
              rootBoundary: 'document',
              padding: 8,
            },
          },
          {
            name: 'preventOverflow',
            enabled: true,
            options: {
              altAxis: true,
              altBoundary: true,
              tether: true,
              rootBoundary: 'document',
              padding: 8,
            },
          },
        ]}
      >
        <div className="popper-content-container">
          <Close className="close-button" onClick={() => setAnchorEl(null)} />
          <div className="purple-area">
            {/* Área morada */}
          </div>
          <div className="compose-bar-area">
            <ComposeBar
              style="chat-widget"
              endpoint='/mail/usuario/notificacion'
              showAsunto={true}
              showChecklist={false}
              defaultRecipient={anonimo ? "Anonimo@anonimo.com" : decode && decode.correo_inst}
            />
          </div>
          <div className="comment-box">
            {/* Cuadro de comentarios */}
            <label>
              Anónimo:
              <Checkbox checked={anonimo} onChange={handleAnonimoChange} />
            </label>
            Espacio para enviar comentarios
          </div>
        </div>
      </Popper>
    </div>
  );
}
