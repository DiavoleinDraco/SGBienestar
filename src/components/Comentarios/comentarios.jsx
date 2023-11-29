import React, { useState } from 'react';
import Popper from '@mui/material/Popper';
import Button from '@mui/material/Button';
import { Close, Message } from '@mui/icons-material';
import ComposeBar from '../componentedeprueba/Redactar_mensaje';
import './comentarios.css';

export default function Comentarioas() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
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
            <ComposeBar style="chat-widget" endpoint='/mail/admin' showAsunto={true} showChecklist={false}
              defaultRecipient='sgbienestar.sena@gmail.com'/>
          </div>
          <div className="comment-box">
            {/* Cuadro de comentarios */}
            Espacio para enviar comentarios
          </div>
        </div>
      </Popper>

    </div>
  );
}
