import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

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

  const handleChange = (event) => {
    const newCount = parseInt(event.target.value, 10) || 0;
    setCount(newCount);
    onCountChange(newCount);
  };


  return (
    <Box
      sx={{
        color: 'action.active',
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
          marginBottom: 2,
        },
        '& .MuiBadge-root': {
          marginRight: 4,
        },
      }}
    >
      <div>
        
        <ButtonGroup>
         <input type="text" value={count} onChange={handleChange} />
          <Button aria-label="reduce" onClick={handleDecrease} disabled={!isImplementoSelected}>
            <RemoveIcon fontSize="small" />
          </Button>
          <Button aria-label="increase" onClick={handleIncrease} disabled={!isImplementoSelected}>
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>
      </div>
    </Box>
  );
}