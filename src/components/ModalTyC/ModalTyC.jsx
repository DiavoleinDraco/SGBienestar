import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {makeStyles } from '@material-ui/core';
import Checkbox from '@mui/material/Checkbox';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 600, // Aumenta la altura del modal
  bgcolor: 'blue',
  border: '2px solid white',
  boxShadow: 24,
};

const styles = makeStyles ({
  maiBtn: {
    padding: 10,
    overflow: 'auto',
  }
})

const contentStyle = {
  padding: 10,
  overflow: 'auto', // Agrega barras de desplazamiento si es necesario
  maxHeight: '300px', // Establece una altura máxima para el contenido
};


export default function ModalTyC({ nombre, texto }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const classes = styles ()
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
    <div>
      <Button onClick={handleOpen}>{nombre}</Button>
      <Modal
        className={classes.maiBtn}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={contentStyle}>{texto} <Checkbox {...label} /> Aceptar términos y condiciones.</Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}