import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { Collapse, IconButton } from '@mui/material';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Alertas({ error, advertencia, info, exito, tiempo }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const renderAlert = () => {
    if (error) {
      return <Alert onClose={() => {}} severity="error">{error}</Alert>;
    } else if (advertencia) {
      return <Alert severity="warning">{advertencia}</Alert>;
    } else if (info) {
      return <Alert severity="info">{info}</Alert>;
    } else if (exito) {
      return <Alert severity="success">{exito}</Alert>;
    } else if(tiempo){
      return (
      <Collapse in={open}>
      <Alert
        severity='info'
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
          
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        {tiempo}
      </Alert>
    </Collapse>
      )
    }
      else {
      return null; 
    }
  };

  return (
    <div className={classes.root}>
      {renderAlert()}
    </div>
  );
}