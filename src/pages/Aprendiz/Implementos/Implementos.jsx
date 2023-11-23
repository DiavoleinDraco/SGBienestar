import React, { useEffect, useState } from "react";
import get from '../../../UseFetch';
import Board from "../Board_Aprendiz/Board_Aprendiz";
import { Box } from "@mui/material";
import NavTabs from '../../../components/NavTabs/NavTabs'
import Card_Implementos from "../../../components/Card_Implementos/Card_Implementos";
import prueba from '../../imagenes/fondo.jpg';
import Button from '@mui/material/Button';

export default function Implementos(){
    const [implementos, setImplementos] = useState([]);
    const [implementosSeleccionados, setImplementosSeleccionados] = useState([]);
    const [data, setData] = useState([])


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

      const handleSelectImplemento = (implemento) => {
        // Verificar si el implemento ya está seleccionado
        const isSelected = implementosSeleccionados.some((item) => item.id === implemento.id);
      
        if (!isSelected) {
          // Si no está seleccionado, añadirlo a la lista de seleccionados
          setImplementosSeleccionados((prevSelected) => [...prevSelected, implemento]);
        }
      
        // Actualizar el estado 'data' con la información de los implementos seleccionados
        setData(
          implementosSeleccionados.map((item) => ({
            id: item.id,
            nombre: item.nombre,
          }))
        );
      
        // Mostrar información en la consola
        console.log('Implementos seleccionados:', data);
      };

      const renderImplementosPorCategoria = (categoria) => (
        <div>
          <h3>{categoria}</h3>
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
                      implemento.img
                    ]}
                    onSelect={() => handleSelectImplemento(implemento)}
                    isSelected={implementosSeleccionados.some((item) => item.id === implemento.id)}
                  />
                </div>
              ))}
          </ul>
        </div>
      );
  
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
              <Button>PRESTAR {implementosSeleccionados.length} {'IMPLEMENTO(S)'}</Button>
            </span>
          )}
          <NavTabs tabs={tabs} />
        </Box>
      </>
    );
  }