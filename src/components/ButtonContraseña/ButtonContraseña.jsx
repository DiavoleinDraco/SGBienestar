import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { Input } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { Visibility } from '@material-ui/icons';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import './ButtonContraseña.css';
import Tooltip from '@mui/material/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    color: '#000',
    width:" 250",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '200px',
  },
  nombre: {
    fontSize: '200px',
  },
}));

export default function ButtonContraseña({ nombre, onChange, required }) {
  const [passwordError, setPasswordError] = useState(false);
  const classes = useStyles();
  const [errorValido, setErrorValido] = useState(false);

  
  const [passwordValues, setPasswordValues] = useState({
    password: '',
    showPassword: false,
  });
  const [confirmPasswordValues, setConfirmPasswordValues] = useState({
    confirmPassword: '',
    showConfirmPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setPasswordValues({ ...passwordValues, [prop]: event.target.value })
    const fieldValue = event.target.value
    onChange(fieldValue)
  };

  const handleChangeConfirmPassword = (prop) => (event) => {
    setConfirmPasswordValues({ ...confirmPasswordValues, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setPasswordValues({ ...passwordValues, showPassword: !passwordValues.showPassword });
  };

  const handleClickShowConfirmPassword = () => {
    setConfirmPasswordValues({ ...confirmPasswordValues, showConfirmPassword: !confirmPasswordValues.showConfirmPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&+.])[A-Za-z\d$@$!%*?&+.]{8,20}$/;
  ;
  const passwordsMatch = passwordValues.password === confirmPasswordValues.confirmPassword;
  

  const handleBlur = () => {
    if (required && passwordValues.password === '') {
      setPasswordError(true);
    } else {
      setPasswordError('');
    }

    if (!passwordPattern.test(passwordValues.password)) {
      setErrorValido(true);
    } else {
      setErrorValido(false);
    }

  };
  const handleConfirmPasswordBlur = () => {
    if (!passwordsMatch) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    };
  };

  return (
    <div className={classes.root}>
      <div className='botton1'>
        <Tooltip title='La contraseña debe contener al menos 8 caracteres, incluyendo números, mayúsculas, minúsculas y caracteres especiales.'
        arrow
        sx={{ fontSize: '26px' }}>
        <FormControl sx={{ m: 1, width: '210px' }} variant="standard">
          <InputLabel className='contraseña' htmlFor="standard-adornment-password">{nombre}</InputLabel>
          <Input
            id="standard-adornment-password"
            type={passwordValues.showPassword ? 'text' : 'password'}
            value={passwordValues.password}
            onChange={handleChange('password')}
            onBlur={handleBlur}
            label={nombre}
            error={Boolean(passwordError)}
            helperText={passwordError}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  style={{position: 'relative', right: '-18px'}}
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {passwordValues.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          {(passwordError) && (<p style={{ color: 'red' }}>Este campo es obligatorio.</p>) ||
          (errorValido) && (<p style={{ color: 'red' }}>Contraseña inválida.</p>)}
        </FormControl>
        </Tooltip>
      </div>

      <div className='botton2'>
        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
          <InputLabel className='comf' htmlFor="standard-adornment-password">Confirmar {nombre}</InputLabel>
          <Input
            id="standard-adornment-password"
            type={confirmPasswordValues.showConfirmPassword ? 'text' : 'password'}
            value={confirmPasswordValues.confirmPassword}
            onChange={handleChangeConfirmPassword('confirmPassword')}
            onBlur={handleConfirmPasswordBlur}
            error={Boolean(passwordError)}
            helperText={passwordError}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {confirmPasswordValues.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={160}
          />
          {(!passwordsMatch) && (<p style={{ color: 'red' }}>Las contraseñas no coinciden.</p>)}
        </FormControl>
      </div>
    </div>
  );
};