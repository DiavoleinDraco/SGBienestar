import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function MensajesAlertas({ error, advertencia, info, exito }) {
  const classes = useStyles();

  const renderAlert = () => {
    if (error) {
      return <Alert severity="error">{error}</Alert>;
    } else if (advertencia) {
      return <Alert severity="warning">{advertencia}</Alert>;
    } else if (info) {
      return <Alert severity="info">{info}</Alert>;
    } else if (exito) {
      return <Alert severity="success">{exito}</Alert>;
    } else {
      return null; 
    }
  };

  return (
    <div className={classes.root}>
      {renderAlert()}
    </div>
  );
}