import React, { useEffect, useState } from "react";
import get from '../../../UseFetch';
import Board from "../Board_Aprendiz/Board_Aprendiz";
import { Box } from "@mui/material";
import NavTabs from '../../../components/NavTabs/NavTabs'
import Card_Implementos from "../../../components/Card_Implementos/Card_Implementos";
import prueba from '../../imagenes/fondo.jpg';
import Button from '@mui/material/Button';
import jwtDecode from "jwt-decode";
import Dialogos from "../../../components/Dialogos/Dialogos";
import Textfield from '../../../components/Textfield/Textfield';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Almacenar_Imple from "../../../components/Almacenar_Imple/Almacenar_Imple";
import Snackbar from "@mui/material/Snackbar";
import { forwardRef } from "react";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Implementos(){
    const [implementos, setImplementos] = useState([]);
    const [implementosSeleccionados, setImplementosSeleccionados] = useState([]);
    const [open, setOpen] = useState(false)
    const [errorMensaje, setErrorMensaje] = useState(null);
    const [isImplementoSelected, setIsImplementoSelected] = useState(false)

    const errorCant = () => {
      setOpen(false)
    }


    useEffect(() => {
        get('/implementos')
          .then((implementosdata) => {
            // Mapear los datos y cambiar '_id' a 'id'
            console.log('Info de implementos: ', implementosdata)

            const transformedData = implementosdata.map((item) => {
              const material = item.descripcion ? item.descripcion.material || null : null;
              const tamano = item.descripcion.tamano || null;
              const descripcion = `Material: ${material}, Tamaño: ${tamano}`;
              const estado = item.estado ? item.estado[0].estado : null;
              const cantidadEstado = item.estado && item.estado[0] ? item.estado[0].cantidad || null : null;
              const valueAP = item.estado[0].apto || false;
            
              return {
                ...item, 
                id: item._id, 
                nombre: item.nombre, 
                categoria: item.categoria[0] ? item.categoria[0].nombre : null,
                marca: item.marca ? item.marca.nombre : null,
                peso: item.descripcion.peso || 'N/A',
                estado: estado ? estado[0].estado : null,
                cantidadEstado: cantidadEstado,
                apto: valueAP,
                color: item.descripcion.color || 'N/A',
                detalles: item.descripcion.detalles || 'N/A',
                descripcion: descripcion,
                img: item.img
              }
            });
            setImplementos(transformedData);
          })
          .catch((error) => {
            console.error('Error al cargar los implementos', error);
          });
      }, []);
      
    const token = localStorage.getItem('token')
    const almacenar= jwtDecode(token)
    console.log(almacenar)

    const handleSelectImplemento = (implemento) => {
      setImplementosSeleccionados((prevSelected) => {
        const isSelected = prevSelected.some((item) => item.id === implemento.id);
    
        if (isSelected) {
          setIsImplementoSelected(false);
          return prevSelected.filter((item) => item.id !== implemento.id);
        }
    
        if (almacenar.privilegio === 1 && almacenar.privilegio === 2 && prevSelected.length >= 1) {
          
        } else if (almacenar.privilegio === 3 && prevSelected.length >= 1){
          setErrorMensaje('Solo puedes seleccionar un implemento.');
          setOpen(true);
          return prevSelected;
        }
    
        setIsImplementoSelected(true);
        return [...prevSelected, { ...implemento, cantidad: 0 }];
      });
    };

    const handleCountChange = (implementoId, newCount) => {
      setImplementosSeleccionados((prevSelected) => {
        return prevSelected.map((item) =>
          item.id === implementoId ? { ...item, cantidad: newCount } : item
        );
      });
    };
  
  

      const renderImplementosPorCategoria = (categoria) => (
        <div>
         <h3>{categoria === 'N/A' ? 'OTROS' : categoria.toUpperCase()}</h3>
          <ul>
            {implementos
              .filter((implemento) => implemento.categoria === categoria)
              .map((implemento) => (
                <div key={implemento.id}>
                  <Card_Implementos
                    imagen={prueba}
                    textoAlt={implemento.nombre}
                    titulo={implemento.nombre.toUpperCase()}
                    descripcion={[
                      implemento.descripcion,
                      ', Color: ',
                      implemento.color,
                      ',   Marca: ',
                      implemento.marca,
                      ',    Peso: ',
                      implemento.peso,
                      '  imagen:   ',
                      implemento.img,
                    ]}
                    chip={<div>
                        <Stack direction="row" spacing={1}>
                            <Chip label={`Disponible: ${implemento.cantidad}`} />
                        </Stack>

                        <Almacenar_Imple
                          cantidadDisponible={implemento.cantidad}
                          onCountChange={(newCount) => {
                            handleCountChange(implemento.id, newCount);
                          }}
                          isImplementoSelected={implementosSeleccionados.some((item) => item.id === implemento.id)}
                        />

                        </div>}
                    onSelect={() => handleSelectImplemento(implemento)}
                    isSelected={implementosSeleccionados.some((item) => item.id === implemento.id)}
                  />
                </div>
              ))}
          </ul>
        </div>
      );

      

      const handlePrestarClick = () => {
        // Verificar si alguna cantidad es igual a cero
        const hasZeroQuantity = implementosSeleccionados.some((item) => item.cantidad === 0);
      
        if (hasZeroQuantity) {
          setErrorMensaje("Debe ingresar una cantidad para cada implemento seleccionado.");
          setOpen(true);
        } else {
          
          const implementosAprestar = implementosSeleccionados.map((item) => ({
          id: item.id,
          nombre: item.nombre,
          cantidad: item.cantidad,

        }));
          setOpen(false); // Cerrar el Snackbar si la acción fue exitosa
          console.log('Implementos a prestar:', implementosAprestar);
        }
      }

      useEffect(() => {
        // Este efecto se activará cuando implementosSeleccionados cambie
        console.log('Implementos sel:', implementosSeleccionados);
      }, [implementosSeleccionados]);
    
  
      const tabs = [
          {
            label: 'DEPORTIVO',
            value: '1',
            content: [
              renderImplementosPorCategoria('Baloncesto'),
              renderImplementosPorCategoria('Fútbol sala'),
              renderImplementosPorCategoria('Voleibol'),
              renderImplementosPorCategoria('Tenis de mesa'),
              renderImplementosPorCategoria('Ajedrez'),
              renderImplementosPorCategoria('N/A')
            ],
          },
          {
            label: 'GIMNASIO',
            value: '2',
            content: renderImplementosPorCategoria('Gimnasio'),
          },
          
      ];
  
      return (
        <>
        <Box sx={{ display: 'block', position: 'relative', left: '200px' }}>
          <Board />
          <h2>Implementos</h2>
          {implementosSeleccionados.length > 0 && (
            <span style={{ marginLeft: '10px' }}>
              <Button
              variant="contained"
              onClick={handlePrestarClick}
              color="primary"
              size="large" // Puedes ajustar el tamaño del botón aquí
              style={{ fontSize: '20px', fontWeight: 'bold' }} // Estilos adicionales
            > PRESTAR {implementosSeleccionados.length} {'IMPLEMENTO(S)'}</Button>
            </span>
          )}
          {implementosSeleccionados.length === 0 && (
          <span style={{ marginLeft: '10px' }}>
            {/* Mostrar un mensaje o deshabilitar el botón si no hay implementos seleccionados */}
            <Button
              variant="contained"
              color="primary"
              size="large" // Puedes ajustar el tamaño del botón aquí
              style={{ fontSize: '20px', fontWeight: 'bold' }} // Estilos adicionales
              disabled
            >PRESTAR</Button>
          </span>
        )}
        <Stack>
        <Snackbar
          className="Snackbar-contraseña"
          open={open}
          autoHideDuration={6000}
          onClose={errorCant}
        >
          <Alert
            onClose={errorCant}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorMensaje}
          </Alert>
        </Snackbar>
      </Stack>
          <NavTabs tabs={tabs} />
        </Box>
      </>
    );
  }