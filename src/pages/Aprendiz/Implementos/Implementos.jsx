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
import Alertas from "../../../components/Alertas/Alertas";

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
    const [isComponentInitialized, setIsComponentInitialized] = useState(false); // Nuevo estado

    const navigate = useNavigate();
    let fechaActual = new Date()
    const tiempoHm = fechaActual.getHours().toString().padStart(2, '0') + ':' + fechaActual.getMinutes().toString().padStart(2, '0');
    const isTiempoEnRango = tiempoHm >= (configuracion && configuracion.horario_inicio) && tiempoHm <= (configuracion && configuracion.horario_fin);
    console.log(isTiempoEnRango)
    const errorCant = () => {
      setOpen(false)
    }

    const imagenesTemporales = [
      "https://media.istockphoto.com/id/488788931/es/foto/orange-basket-ball-foto-sobre-el-fondo-blanco.jpg?s=612x612&w=is&k=20&c=0t8skBaQDuViilmKwQR-WAe-1CMlJxk5ltCDov5paCI=",
      "https://media.istockphoto.com/id/93889291/es/foto/f%C3%BAtbol-americano-estilo-antiguo-utilizado-aislado-sobre-fondo-blanco-pelota-de-f%C3%BAtbol.jpg?s=612x612&w=is&k=20&c=Pl7TMD8jrXoboQuvINoG-BI19D0JYOiwpVZgbggR6iE=",
      "https://media.istockphoto.com/id/187071354/es/foto/soccer-web-en-blanco-y-negro.jpg?s=612x612&w=is&k=20&c=6Qk6q5CGvuZKZIokz5zFmrS95Mrsnf_oDd2MqKPho3M=",
      "https://media.istockphoto.com/id/618341990/es/foto/pelota-de-voleibol-aislada-sobre-fondo-blanco.jpg?s=612x612&w=is&k=20&c=1KgZ4TXJMR6P9KK6yURQIRVQgV_24RugGnYGogfh7Ps=",
      "https://media.istockphoto.com/id/1425158165/es/foto/ping-pong-de-ping-pong-de-mesa-y-pelota-blanca-sobre-tabla-azul.jpg?s=612x612&w=is&k=20&c=9i-pv-UR0Avjgk83Qwv8awfMMRRbwWdQp4q7YYHEoXg=",
      "https://media.istockphoto.com/id/1425158165/es/foto/ping-pong-de-ping-pong-de-mesa-y-pelota-blanca-sobre-tabla-azul.jpg?s=612x612&w=is&k=20&c=9i-pv-UR0Avjgk83Qwv8awfMMRRbwWdQp4q7YYHEoXg=",
      "https://media.istockphoto.com/id/1295770766/es/foto/juego-de-ajedrez.jpg?s=612x612&w=is&k=20&c=6AEY7qkm7Ya41siU8oizrK9zclVARZgbVvtyDg5Yhm8=",
      "https://media.istockphoto.com/id/842349834/es/foto/ingl%C3%A9s-ventilador-celebrando.jpg?s=612x612&w=is&k=20&c=z4mA4HceRFtsWB-acPGiBj4ZsiuNdWT1ChSOX9nP6-Q=",
      "https://images.unsplash.com/photo-1556009756-5a06dce4729d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://images.unsplash.com/photo-1520697517317-6767553cc51a?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://media.istockphoto.com/id/488788931/es/foto/orange-basket-ball-foto-sobre-el-fondo-blanco.jpg?s=612x612&w=is&k=20&c=0t8skBaQDuViilmKwQR-WAe-1CMlJxk5ltCDov5paCI="

    ]

    useEffect(() => {
   
      setIsComponentInitialized(true);
    }, []);
  
    useEffect(() => {
      if (isComponentInitialized) {
        const implementosAprestarStr = localStorage.getItem('implementosAprestar');
        if (implementosAprestarStr) {
          const implementosAprestar = JSON.parse(implementosAprestarStr);
          setImplementosSeleccionados(implementosAprestar);
        }
      }
    }, [isComponentInitialized]);
  
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
                img: imagenesTemporales[Math.floor(Math.random() * imagenesTemporales.length)], // Asignar una imagen aleatoria
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
    
        
    if (almacenar.privilegio === 3) {
      if (prevSelected.length >= 1) {
        setErrorMensaje('Solo puedes seleccionar un implemento.');
        setOpen(true);
        return prevSelected;
      } else if (implemento.categoria === 'Gimnasio') {
        setErrorMensaje('No se permite el préstamo de implementos de Gimnasio');
        setOpen(true);
        return prevSelected;
      }
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
                    implemento.descripcion ? implemento.descripcion : '',
                    ', Color:     ',
                    implemento.color ? implemento.color : '',
                    ',   Marca: ',
                    implemento.marca ? implemento.marca : '',
                    ',    Peso: ',
                    implemento.peso ? implemento.peso : '',
                    ',     Estado:    ',
                    implemento.estado ? implemento.estado : ''
                  ]}
                  chip={
                    <div className="disponible">
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
                    </div>
                  }
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
          // Limpiar implementos almacenados en localStorage después de cargarlos
          localStorage.removeItem('implementosAprestar');
        }
      
        // Efecto de limpieza al desmontar el componente
        return () => {
          setImplementosSeleccionados([]);
        };
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
          {!isTiempoEnRango ? <div style={{position: "absolute", left: "5px", bottom:"5px", zIndex: "999"}}>  <Alertas tiempo={"Estas ingresando fuera de los tiempos estipulados de prestamo, todo prestamo sera negado"}></Alertas> </div>
:  <div style={{display: "none", position: "absolute", left: "5px", bottom:"5px", zIndex: "999"}}>  <Alertas tiempo={"Estas ingresando fuera de los tiempos estipulados de prestamo, todo prestamo sera negado"}></Alertas></div> }
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