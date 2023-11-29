import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import'./Card_Implementos.css';

export default function Card_Implementos({ textoAlt, imagen, titulo, descripcion, boton, onSelect, isSelected, chip }) {
  
  const handleCardClick = () => {
    onSelect()
  }
  return (
    <Card sx={{ maxWidth: 295,maxHeight: 405,borderRadius:"15px",backgroundColor: isSelected ? '#e3e3e3':'fff',display:"flex" ,flexDirection:"column"}}>
      <CardActionArea className='cardarea' onClick={handleCardClick}>
        <CardMedia
          component="img"
          height="195"
          image={"https://i.pinimg.com/564x/40/69/a7/4069a7b2c24fa0847352fa9e55a07a8d.jpg"}
          alt={textoAlt}
        />
        <CardContent className='cardCont'>
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