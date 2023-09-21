import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Input } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { Visibility } from '@material-ui/icons';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

  export default function ContraseñaLogin({ nombre, onChange, required }){
    const [passwordError, setPasswordError] = useState(false);
    const [values, setValues] = useState({password: '', showPassword: false, });

    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value })
      const fieldValue = event.target.value
      onChange(fieldValue)
    };

    const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleBlur = () => {
      if (required && values.password === '') {
        setPasswordError(true);
      } else {
        setPasswordError('');
      }
    }

    return (

        
        <FormControl  className='conts' sx={{ m: 1, }} variant="standard">
          <InputLabel className='contraseña' htmlFor="standard-adornment-password">{nombre}</InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            onBlur={handleBlur}
            label={nombre}
            error={Boolean(passwordError)}
            helperText={passwordError}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          {(passwordError) && (<p style={{ color: 'red' }}>Este campo es obligatorio</p>)}
        </FormControl>

  
    );
  };
  