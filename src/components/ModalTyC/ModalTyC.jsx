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
  width: 300,
  height: 600, // Aumenta la altura del modal
  bgcolor: '#f6f6f6',
  border: '2px solid black',
  boxShadow: 24,
  maxHeight: '80vh',
  overflow: 'auto',
  padding: '20px'
};

const styles = makeStyles ({
  maiBtn: {
    padding: '50px',
    overflow: 'auto',
    alignItems:'center'
  }
})

const contentStyle = {
  padding:'59px',
  overflow: 'auto', // Agrega barras de desplazamiento si es necesario
  maxHeight: '410px',
  textalign:'center' // Establece una altura máxima para el contenido
};


export default function ModalTyC({ nombre, texto, onChange}) {
  const [elementos, setElementos] = React.useState(false)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    onChange(elementos)
  };
  const classes = styles ()
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  const handleInputChange = () => {
    setElementos(!elementos);
    onChange(!elementos);
  };

  return (
    <div>
      <Button onClick={handleOpen}> <Typography id="transition-modal-description" sx={contentStyle}>{nombre} <Checkbox {...label} checked={elementos} onChange={handleInputChange} /></Typography></Button>
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
            <Typography id="transition-modal-title" variant="h6" component="h2" >
             {texto}
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};