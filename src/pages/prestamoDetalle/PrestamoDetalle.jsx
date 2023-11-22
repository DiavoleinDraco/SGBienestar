import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Menu from '../../components/menu/Menu';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';
import get, { getParametre, eliminar, actualizar } from "../../UseFetch";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";



const styles = {
  container: {
    display: 'flex',
    position: 'relative',
    top: '100px',
  },
  mensajesDetalleContainer: {
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '8px',
  },
  mensajesDetalleHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  cuadroInformativo: {
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
  },
  mensajeHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mensajeInfo: {
    flex: 1,
  },
  mensajeInfoTitle: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  mensajeInfoPara: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  mensajeBody: {
    marginTop: '20px',
  },
  contenidoInformativo: {
    backgroundColor: '#007bff',
    color: '#ffffff',
    padding: '20px',
    fontSize: '24px',
    textAlign: 'center',
  },
  contenidoInformativoText: {
    fontSize: '16px',
  },
  contenidoInformativoLink: {
    color: '#ffffff',
    textDecoration: 'underline',
  },
  footer: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#999',
  },
};

export default function PrestamoDetalle() {
  const { prestamoId } = useParams();
  const [user, setUser] = useState(null);
  const redireccionar = useNavigate();
  const token = localStorage.getItem('token')
  const [estados, setEstados] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      if (Object.entries(estados).length === 0) {
        try {
          const userData = await get("/estado-prestamo");
          setEstados(userData)
          console.log(userData)
        } catch (error) {
          console.error("Error al obtener la información del usuario:", error);
        }
      }

    };

    fetchData();
  }, [estados]);


  const handleActualizarEstado = async (id) => {
    try {
      await actualizar('/prestamos/', prestamoId, { estado: id }).then(
        (data) => console.log(data)
      )

    } catch (error) {
      console.log("Error al enviar" + error)
    }
  }

  const encontrarEstado = (key) => {
    const estadoEncontrado = (estados) ? estados.find((estad) => estad.nombre == key ) : console.log('no cargo')
    return estadoEncontrado._id
  }

  const isPageReload = () => {
    // Verifica si se ha recargado la pagina
    return performance.navigation.type === performance.navigation.TYPE_RELOAD;
  };
  

  useEffect(() => {
    const fetchData = async () => {
        const userData = await getParametre("/prestamos/", prestamoId);
        setUser(userData);
        
    };

    fetchData();
  }, [prestamoId]); // Asegúrate de agregar prestamoId como dependencia

  useEffect(() => {
    if(user && !isPageReload()){
      handleAprobarPrestamo()
    }
  },[user])




  const handleAprobarPrestamo = async () => {
    console.log( user.estado._id)
    if (token) {
      const data = jwtDecode(token)
      if (data.privilegio < 3) {
        if ( user.estado._id == encontrarEstado('Pendiente')) {
          await handleActualizarEstado(encontrarEstado('Aprobado'))
          
        } else if ( user.estado._id == encontrarEstado('Aprobado')) {
          await handleActualizarEstado(encontrarEstado('Completado'))
          console.log(user.estado)
        }

      }
    }
  }






  const handleDeleteClick = async (_id) => {
    try {
      await eliminar('/prestamos/', _id);
      redireccionar("/mensajes");
    } catch (error) {
      console.error("Error al eliminar", error);
    }
  };


  return (
    <Box sx={styles.container}>
    <Menu />
    <div style={styles.mensajesDetalleContainer}>
      {user && (
        <>
          {user.estado._id === encontrarEstado('Completado') ? (
            <p>El prestamo ya ha sido completado</p>
          ) : (
            <>
              {user.privilegio < 3 && user.estado._id === encontrarEstado('Pendiente') ? (
                <p>El prestamo ha sido aprobado</p>
              ) : (
                <>
                  <h1>Detalles del prestamo</h1>
                  <p>Numero de ficha: {user.usuario.ficha.codigo}</p>
                  <p>Correo institucional: {user.usuario.correo_inst}</p>
                  <p>Programa de formación: {user.usuario.ficha.programa.nombre}</p>
                  <p>Telefono: {user.usuario.telefono}</p>
                  <p>Prestado por: {user.usuario.nombres + " " + user.usuario.apellidos}</p>
                  {user.implementos.map((implemento, index) => (
                    <p key={index}>
                      Implemento: {implemento.nombre}
                      Categoría: {implemento.categoria.map((categoria) => categoria.nombre)}
                      Descripcion: {implemento.descripcion.color}
                    </p>
                  ))}
                  {user.estado._id === encontrarEstado('Completado') && (
                    <p>El prestamo se ha completado</p>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  </Box>
  );
  }