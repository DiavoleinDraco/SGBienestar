import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import'./Almacenar_Imple.css';

export default function Almacenar_Imple({ cantidadDisponible, onCountChange, isImplementoSelected }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Restablecer el valor a 0 cuando se deselecciona el implemento
    if (!isImplementoSelected) {
      setCount(0);
      onCountChange(0);
    }
  }, [isImplementoSelected]);

  const handleDecrease = () => {
    // Verificar que la cantidad no sea menor que 1
    if (count >= 1) {
      setCount(count - 1);
      onCountChange(count - 1);
    }
  };

  const handleIncrease = () => {
    // Verificar que la cantidad no supere la cantidad disponible
    if (count < cantidadDisponible) {
      setCount(count + 1);
      onCountChange(count + 1);
    }
  };


  return (
    <Box 
      sx={{
        color: 'action.active',
        width:"80%",
        height:"90px",
        display:"flex",
     marginBottom:"24px",
        justifyContent:"space-evenly",
      
        '& > *': {
          marginBottom: 1,
        },
        '& .MuiBadge-root': {
          marginRight: 4,
        },
      }}
    >
        <ButtonGroup className="cont-p">
        <input className="inpu" type="text" value={count} />
          <Button className="button-mas"  aria-label="reduce" onClick={handleDecrease} disabled={!isImplementoSelected}>
            <RemoveIcon fontSize="small" />
          </Button>
          <Button className="button-mas" aria-label="increase" onClick={handleIncrease} disabled={!isImplementoSelected}>
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>
    </Box>
  );
}