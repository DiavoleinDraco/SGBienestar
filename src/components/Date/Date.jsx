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
  errorText: {
    color: 'black', // Cambia el color del mensaje de error a rojo
  },
}));

export default function Date({ Descripcion, onChange }) {
  const handleInputChange = (e) => {
    const fieldValue = e.target.value;
    onChange(fieldValue);
  };
  const classes = useStyles();
  return (
    <form className={classes.mainBtn}  noValidate>
      <TextField
        className={classes.textField}
        onChange={handleInputChange}
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