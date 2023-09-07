import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
<<<<<<< HEAD
=======
import { makeStyles } from '@mui/styles';
import './Textfield.css';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '100px auto', // Centra vertical y horizontalmente
  },
  mainBtn: {
    backgroundColor: 'rgba(195, 193, 192, 0.8)',
    borderRadius: '10px',
    textAlign: 'center', // Centra horizontalmente
    margin: '10px auto', // Centra horizontalmente
    border: '1px solid black',
    padding: '10px', // Agrega espacio interior para un mejor aspecto
    boxSizing: 'border-box', // Evita que el padding afecte el ancho total
  },
  errorText: {
    color: 'black',
  },
  textField: {
    maxWidth: '100%',
  },
  errorMessage: {
    maxHeight: '2em',
    overflow: 'hidden',
  },
});

export default function Textfield({ nombre, required }) {
  const [error, setError] = React.useState(false);
  const classes = useStyles();

  const handleBlur = (event) => {
    if (required && event.target.value === '') {
      setError(true);
    } else {
      setError(false);
    }
  };
>>>>>>> fec46ba5b582c0a054220ad8275ae4b10e365d71

export default function Textfield({ nombre }) {
  return (
<<<<<<< HEAD
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="standard-basic" label={nombre} variant="standard" />
    </Box>
=======
    <div className={classes.container}>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
        }}
        noValidate
        autoComplete="off"
        onBlur={handleBlur}
      >
        <div className={classes.mainBtn}>
          <TextField className={classes.textField} id="outlined-basic" label={nombre} variant="outlined" />
        </div>
      </Box>
      {error && <p className={`${classes.errorText} ${classes.errorMessage}`}>Este campo es obligatorio.</p>}
    </div>
>>>>>>> fec46ba5b582c0a054220ad8275ae4b10e365d71
  );
}
