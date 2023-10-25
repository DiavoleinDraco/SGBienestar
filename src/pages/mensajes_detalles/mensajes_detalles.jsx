import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Menu from '../../components/menu/Menu';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import './mensajes_detallas.css';
import { useParams } from 'react-router-dom';
import { getParametre, eliminar } from "../../UseFetch"; // Asegúrate de importar eliminar
import { useNavigate } from "react-router-dom";

export default function MensajesDetalle() {
  const { messageId } = useParams();
  const [user, setUser] = useState(null);
  const redireccionar = useNavigate();  // Inicializa history

  const infoCorreo = () => {
    getParametre("/mail/mail/", messageId)
      .then((userData) => {
        setUser(userData);
        console.log(userData);
      })
      .catch((error) => {
        console.error("Error al obtener la información del usuario:", error);
      });
  };

  const handleDeleteClick = async (_id) => {
    try {
      // Realiza la eliminación
      await eliminar('/mail/mail/', _id);
      redireccionar("/mensajes"); // Redirecciona a la página de mensajes después de eliminar
    } catch (error) {
      console.error("Error al eliminar", error);
    }
  };

  useEffect(() => {
    infoCorreo();
  }, []);

  return (
    <Box sx={{ display: 'flex', position: 'relative', top: '100px' }}>
      <Menu />
      <div className="mensajes-detalle-container">
        <div className="mensajes-detalle-header">
        <IconButton onClick={() => redireccionar("/mensajes")}> {/* Redirige a la página de mensajes */}
            <ArrowBackIcon />
          </IconButton>
          <IconButton onClick={() => handleDeleteClick(messageId)}> {/* Llama a handleDeleteClick con el messageId */}
            <DeleteIcon />
          </IconButton>
        </div>
        <div className="mensajes-detalle-content">
          <div className="mensaje-header">
            <div className="mensaje-info">
              <h2>{user && user.asunto}</h2>
              
              <p>Para: {user && user.correo}</p>
            </div>
            <div className="mensaje-body">
            <div style={{ backgroundColor: "#ffffff", marginTop: "20px", width: "600px", margin: "0 auto" }}>
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      <img src="" alt="SGbienestar Logo" width="150" />
    </div>
    <div style={{ backgroundColor: "#007bff", color: "#ffffff", padding: "20px", fontSize: "24px", textAlign: "center" }}>
      Notificación de Sanción
    </div>
    <div style={{ padding: "20px", fontSize: "16px" }}>
      <p>Estimado usuario de SGbienestar,</p>
      <p>{user && user.mensaje}</p>
    </div>
    <div style={{ backgroundColor: "#007bff", color: "#ffffff", textAlign: "center", padding: "20px", fontSize: "14px" }}>
      Póngase en contacto con nosotros en <a href="mailto:soporte@sgbienestar.com">soporte@sgbienestar.com</a> para obtener asistencia.
    </div>
    <div style={{ textAlign: "center", marginTop: "20px", color: "#999" }}>
      © 2023 SGbienestar. Todos los derechos reservados.
    </div>
  </div>
              
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}