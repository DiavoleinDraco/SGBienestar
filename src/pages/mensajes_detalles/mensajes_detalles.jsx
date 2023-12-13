import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Menu from '../../components/menu/Menu';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import './mensajes_detallas.css';
import './responder.css'
import { useParams } from 'react-router-dom';
import { getParametre, eliminar } from "../../UseFetch"; // Asegúrate de importar eliminar
import { useNavigate } from "react-router-dom";
import Buttons from "../../components/Buttons/Buttons";
import { Popover } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ComposeBar from "../../components/componentedeprueba/Redactar_mensaje";
export default function MensajesDetalle() {
  const { messageId } = useParams();
  const [user, setUser] = useState(null);
  const redireccionar = useNavigate();  // Inicializa history
  const [showResponder, setShowResponder] = useState(false);
  const [showReenviar, setShowReenviar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const seccion = localStorage.getItem("seccion")

  const infoCorreo = () => {
    getParametre(seccion, messageId)
      .then((userData) => {
        setUser(userData);
        console.log(userData);
      })
      .catch((error) => {
        console.error("Error al obtener la información del usuario:", error);
      });
  };

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Función para cerrar el Popover
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleReenviarClick = () => {
    setShowReenviar(true);

  }

  const handleResponderClick = () => {
    setShowResponder(true);

  }

  const handleDeleteClick = async (_id) => {
    try {
     
      await eliminar(seccion, _id);
      redireccionar("/admin/mensajes"); 
    } catch (error) {
      console.error("Error al eliminar", error);
    }
  };

  useEffect(() => {
    infoCorreo();
  }, []);

  const mensaje = (
    <div className="mensajes-detalle-content">
      <div className="mensaje-header">
        <div className="contenedor-table-dt-mensajes">
          <table className="table-dt-mensajes">
            <tbody>
              <tr>
                <td>
                  <h1 style={{ color: "#000000" }}>Servicio Nacional de Aprendizaje</h1>
                  <p style={{ color: "#000000" }}>Hola, {user && user.correo}</p>
                  <p style={{ color: "#000000" }}>Asunto: {user && user.asunto}</p>
                  <p style={{ color: "#000000", fontSize: "18px" }}>{user && user.mensaje}</p>
                  <p style={{ color: "#000000" }}>Atentamente, Equipo de Bienestar.</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  return (
    <Box>
      <Menu />
      <div className="mensajes-detalle-container">
        <div className="mensajes-detalle-header">
          <IconButton style={{background: "#000"}} onClick={() => redireccionar("/admin/mensajes")}>
            <ArrowBackIcon />
          </IconButton>
          <IconButton style={{background: "#000"}} onClick={() => handleDeleteClick(messageId)}>
            <DeleteIcon />
          </IconButton>
        </div>
        <div className="mensaje-info">
          <h2>{user && user.asunto}</h2>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p style={{ width: "20%" }}>Para: {user && user.correo && Array.isArray(user.correo) ? user.correo.join(", ").slice(0, 23) + "..." : "Correo no válido"}</p>
            <button
              style={{
                background: "none",
                border: "none",
                width: "10%",
                display: "inline-block",
              }}
              onClick={handlePopoverOpen}
            >
              <KeyboardArrowDownIcon color="action" />
            </button>
          </div>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: 'bottom',  // Ajusta la posición vertical
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',  
              horizontal: 'left',
            }}
          >
            <div style={{ padding: '20px', width: "500px", textAlign: "left" }}>
              <p>Para: {user && user.correo && Array.isArray(user.correo) ? user.correo.join(", ") : "Correo no valido"}</p>
              <p>Asunto: {user && user.asunto}</p>
            </div>
          </Popover>
          {mensaje}

          {showResponder ?
            <div className="cuadro-responder">
              <ComposeBar
                style="custom-style"
                showChecklist={false}
                defaultRecipient={user && user.correo}
                defaultAsunto={user && user.asunto}
                onClose={() => setShowResponder(false)}  // Asigna la función onClose correctamente
              ></ComposeBar>


            </div>
            : <div className="botones-responder">
              <Buttons nombre={"Responder"} onclick={handleResponderClick}></Buttons>
            </div>}
        </div>
      </div>
    </Box>
  );
}