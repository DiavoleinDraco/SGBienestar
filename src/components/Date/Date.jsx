import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './Date.css';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '50%', /* O ajusta el ancho que desees */
    margin: '0 auto',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    margin: '10px',
  },
  mainBtn: {
    backgroundColor: 'rgba(195, 193, 192, 0.8)',
    width: '230px',
    borderRadius: '10px',
    textAlign: 'center',
    margin: '0 auto',
    border: '1px solid black',
  },
  errorText: {
    color: 'black', // Cambia el color del mensaje de error a rojo
  },
}));

export default function Date({ Descripcion }) {
  const classes = useStyles();
  return (
    <form className={classes.mainBtn}  noValidate>
      <TextField
        className={classes.textField}
        id="date"
        label={Descripcion}
        type="date"
        defaultValue=""
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}