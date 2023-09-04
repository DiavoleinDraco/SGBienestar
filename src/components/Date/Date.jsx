import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './Date.css';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function Date({ Descripcion }) {
  const classes = useStyles();
  return (
    <form id='date' className={classes.container} noValidate>
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