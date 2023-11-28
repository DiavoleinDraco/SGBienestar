import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function Card_Implementos({ textoAlt, imagen, titulo, descripcion, boton, onSelect, isSelected, chip }) {
  
  const handleCardClick = () => {
    onSelect()
  }
  return (
    <Card sx={{ maxWidth: 345, backgroundColor: isSelected ? '#b0b0b0' : 'white' }}>
      <CardActionArea onClick={handleCardClick}>
        <CardMedia
          component="img"
          height="140"
          image={imagen}
          alt={textoAlt}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
           {titulo}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {descripcion}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
       {chip}
      </CardActions>
    </Card>
  );
};