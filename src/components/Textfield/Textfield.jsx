import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '50%', /* O ajusta el ancho que desees */
    margin: '0 auto',
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
    color: 'black', // Establece el color del texto de error en negro
  },
  textField: {
    maxWidth: '100%', // Establece un ancho máximo para el TextField
  },
  errorMessage: {
    maxHeight: '2em', // Establece una altura máxima para el mensaje de error
    overflow: 'hidden', // Oculta cualquier contenido que desborde
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

  return (
    <div className={classes.mainBtn}>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
        }}
        noValidate
        autoComplete="off"
        onBlur={handleBlur}
      >
        <TextField className={classes.textField} id="outlined-basic" label={nombre} variant="outlined" />
      </Box>
      {error && <p className={`${classes.errorText} ${classes.errorMessage}`}>Este campo es obligatorio.</p>}
    </div>
  );
}
