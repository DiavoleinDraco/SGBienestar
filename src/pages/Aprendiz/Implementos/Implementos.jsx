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
import'./Implementos.css';
import { useNavigate } from 'react-router-dom';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Implementos(){
    const [implementos, setImplementos] = useState([]);
    const [implementosSeleccionados, setImplementosSeleccionados] = useState([]);
    const [open, setOpen] = useState(false)
    const [errorMensaje, setErrorMensaje] = useState(null);
    const [configuracion, setConfiguracion] = useState({})
    const [isImplementoSelected, setIsImplementoSelected] = useState(false)
    const navigate = useNavigate();
    let fechaActual = new Date()
    const tiempoHm = fechaActual.getHours().toString().padStart(2, '0') + ':' + fechaActual.getMinutes().toString().padStart(2, '0');
    const isTiempoEnRango = tiempoHm >= (configuracion && configuracion.horario_inicio) && tiempoHm <= (configuracion && configuracion.horario_fin);
    console.log(isTiempoEnRango)
    const errorCant = () => {
      setOpen(false)
    }

    useEffect(() => {
      try {
        get("/config-sistema").then((config) =>setConfiguracion(config) )
      } catch (error) {
        console.log(error)
      }
     
    },[])

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

      if (implemento.apto === false) {
        // Mostrar Snackbar indicando que el implemento no es apto
        setErrorMensaje('El implemento no es apto para ser seleccionado.');
        setOpen(true);
        return;
      }

      if (implemento.sanciones === true) {
        // Mostrar Snackbar indicando que el implemento no es apto
        setErrorMensaje('No se puede hacer la solicitud de préstamo, porque usted tiene una sanción activa');
        setOpen(true);
        return;
      }

      setImplementosSeleccionados((prevSelected) => {
        const isSelected = prevSelected.some((item) => item.id === implemento.id);
    
        if (isSelected) {
          setIsImplementoSelected(false);
          return prevSelected.filter((item) => item.id !== implemento.id);
        }
    
        if (almacenar.privilegio === 3 && prevSelected.length >= 1){
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
         <h3 className="categoria">{categoria === 'N/A' ? 'OTROS' : categoria.toUpperCase()}</h3>
          <ul className="contCard">
            {implementos
              .filter((implemento) => implemento.categoria === categoria)
              .map((implemento) => (
                <div className="card" key={implemento.id}>
                  <Card_Implementos
                    imagen={implemento.img}
                    textoAlt={implemento.nombre}
                    titulo={implemento.nombre.toUpperCase()}
                    descripcion={[
                      implemento.descripcion,
                      ', Color:     ',
                      implemento.color,
                      ',   Marca: ',
                      implemento.marca,
                      ',    Peso: ',
                      implemento.peso,
                    ]}
                    chip={<div className="disponible">
                        <Stack className="disponi" direction="row" spacing={1}>
                            <Chip label={`Disponible: ${implemento.cantidad_disponible}`} />
                        </Stack>

                        <Almacenar_Imple
                          cantidadDisponible={implemento.cantidad_disponible}
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
      
          // Guardar implementos a prestar en el localStorage
          localStorage.setItem('implementosAprestar', JSON.stringify(implementosAprestar));
      
          setOpen(false); // Cerrar el Snackbar si la acción fue exitosa
          console.log('Implementos a prestar:', implementosAprestar);
          navigate("/admin/prestamos");
        }
      }

      useEffect(() => {
        // Verificar si hay implementos almacenados en el localStorage
        const implementosAprestarStr = localStorage.getItem('implementosAprestar');
        if (implementosAprestarStr) {
          const implementosAprestar = JSON.parse(implementosAprestarStr);
          setImplementosSeleccionados(implementosAprestar);
        }
      }, []);
  
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
        <Box sx={{ background:"#fff",display: 'flex',width:"100%",flexDirection:"column"}}>
          <Board />
          <div className="cajita"></div>
          <div className="cont-implem">
          <h2 className="titulo-imple">Implementos</h2>

          </div>
          <div className="cont-prestar">
          {implementosSeleccionados.length > 0 && (
            <span style={{ margin: 'auto' }}>
              <Button
              className="Boton-prestarr"
              variant="contained"
              onClick={handlePrestarClick}
              color="primary"
              size="large" // Puedes ajustar el tamaño del botón aquí
              disabled={!isTiempoEnRango}
               // Estilos adicionales
            > PRESTAR {implementosSeleccionados.length} {'IMPLEMENTO(S)'}</Button>
            </span>
          )}
          {implementosSeleccionados.length === 0 && (
          <span >
            {/* Mostrar un mensaje o deshabilitar el botón si no hay implementos seleccionados */}
            <Button className="Boton-prestar"
              variant="contained"
              color="primary"
              size="large" // Puedes ajustar el tamaño del botón aquí
             // Estilos adicionales
              disabled
            >PRESTAR</Button> 
          </span>
        )}
          </div>
      
        <Stack className="imple">
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