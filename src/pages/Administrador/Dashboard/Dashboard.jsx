import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Menu from '../../../components/menu/Menu';
import "./Dashboard.css";
import aprendizes from "./Aprendizes.jpeg";
import get from '../../../UseFetch';
import Skeleton from '@mui/material/Skeleton';

export default function Dashboard(){
    const [actualConfig, setActualConfig] = useState({})


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await get("/config-sistema");
            setActualConfig(response);
            console.log(actualConfig)
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchData();
      }, []);
    return (
        <Box>
            <Menu />
            <div className="fondo">
            </div>
            <div className="contenedor-img-admin">
                <img src={aprendizes} alt="Imagen de aprendizes" />
            </div>
            <div className="contenedor-horario">
                <p>Horario inicio: {actualConfig && actualConfig.horario_inicio}</p>
                <p>Horario Fin: {actualConfig && actualConfig.horario_fin}</p>

            </div>
            <div className="contenedor-video">
            <Box
      sx={{
        p: 8,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Skeleton
        sx={{ bgcolor: 'grey.900' }}
        variant="rectangular"
        width={510}
        height={318}
      />
    </Box>
            </div>
        </Box>
        
    )
}