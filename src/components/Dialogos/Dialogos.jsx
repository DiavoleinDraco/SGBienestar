import React, {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DialogContentText, DialogTitle  } from '@mui/material';
import Button from '@mui/material/Button';

export default function Dialogos({opener, closer, texto,  contenido, handle, hacer, titulo}){
    return (
        <Dialog open={opener} onClose={closer} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
         <DialogTitle id="alert-dialog-title">{titulo}</DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description"> 
            {texto}
          </DialogContentText>
            {contenido}
        </DialogContent>
        <DialogActions>
          <Button onClick={closer}>Cancelar</Button>
          <Button onClick={handle} autoFocus>{hacer}</Button>
        </DialogActions>
      </Dialog>
    )
}