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

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
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
}));

export default function ButtonContraseña({ nombre }) {
  const classes = useStyles();
  const [passwordValues, setPasswordValues] = useState({
    password: '',
    showPassword: false,
  });
  const [confirmPasswordValues, setConfirmPasswordValues] = useState({
    confirmPassword: '',
    showConfirmPassword: false,
  });

  const [passwordError, setPasswordError] = useState(false);

  const handleChange = (prop) => (event) => {
    setPasswordValues({ ...passwordValues, [prop]: event.target.value });
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

  const handleBlur = () => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;

    if (!passwordPattern.test(passwordValues.password)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const handleConfirmPasswordBlur = () => {
    if (passwordValues.password !== confirmPasswordValues.confirmPassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  return (
    <div className={classes.root}>
      <div className='botton'>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">{nombre}</InputLabel>
          <Input
            id="standard-adornment-password"
            type={passwordValues.showPassword ? 'text' : 'password'}
            value={passwordValues.password}
            onChange={handleChange('password')}
            onBlur={handleBlur}
            error={passwordError}
            label={nombre}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {passwordValues.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
      <div className='botton'>
        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
          <InputLabel htmlFor="standard-adornment-password">Confirmar {nombre}</InputLabel>
          <Input
            id="standard-adornment-password"
            type={confirmPasswordValues.showConfirmPassword ? 'text' : 'password'}
            value={confirmPasswordValues.confirmPassword}
            onChange={handleChangeConfirmPassword('confirmPassword')}
            onBlur={handleConfirmPasswordBlur}
            error={passwordError}
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
        </FormControl>
      </div>
      {passwordError && (
        <div style={{ color: 'red' }}>
          {passwordValues.password === confirmPasswordValues.confirmPassword
            ? 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un carácter especial y un número.'
            : 'Las contraseñas no coinciden.'}
        </div>
      )}
    </div>
  );
}