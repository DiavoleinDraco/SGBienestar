import React, { useEffect, useState } from "react";
import get from '../../../UseFetch';
import Board from "../Board_Aprendiz/Board_Aprendiz";
import { Box } from "@mui/material";
import NavTabs from '../../../components/NavTabs/NavTabs'
import Card_Implementos from "../../../components/Card_Implementos/Card_Implementos";
import prueba from '../../imagenes/fondo.jpg'

export default function Implementos(){
    const [implementos, setImplementos] = useState([]);

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
                peso: item.descripcion.peso,
                estado: estado ? estado[0].estado : null,
                cantidadEstado: cantidadEstado,
                apto: valueAP,
                color: item.descripcion.color,
                detalles: item.descripcion.detalles,
                descripcion: descripcion
              }
            });
            setImplementos(transformedData);
          })
          .catch((error) => {
            console.error('Error al cargar los implementos', error);
          });
      }, []);

      const renderImplementosPorCategoria = (categoria) => (
        <div>
          <h3>{categoria}</h3>
          <ul>
            {implementos
              .filter((implemento) => implemento.categoria === categoria)
              .map((implemento) => (
                <div>
                <Card_Implementos
            imagen={prueba}
            textoAlt={implemento.nombre}
            titulo={implemento.nombre}
            descripcion={[implemento.descripcion,', Color: ', implemento.color, ',   Marca: ', implemento.marca, ',    Peso: ', implemento.peso]}
            boton='prestar'
            />
            </div>
              ))}
          </ul>
        </div>
      );
  
      const tabs = [
          {
            label: 'FÚTBOL',
            value: '1',
            content: renderImplementosPorCategoria('Fútbol sala'),
          },
          {
            label: 'VOLEIBOL',
            value: '2',
            content: renderImplementosPorCategoria('Voleibol'),
          },
          {
            label: 'BALONCESTO',
            value: '3',
            content: renderImplementosPorCategoria('Baloncesto'),
          },
          {
            label: 'GIMNASIO',
            value: '4',
            content: renderImplementosPorCategoria('Gimnasio'),
          },
          {
            label: 'TENIS DE MESA',
            value: '5',
            content: renderImplementosPorCategoria('Tenis de mesa')
          },
          {
            label: 'AJEDREZ',
            value: '6',
            content: renderImplementosPorCategoria('Ajedrez')
          }
      ];
  
      return (
          <>
          <Box sx={{ display: 'block', position: 'relative', left: '200px'}}>
            <Board />
            <h2>Implementos</h2>
            <NavTabs tabs={tabs} />
          </Box>
          </>
      );
  }