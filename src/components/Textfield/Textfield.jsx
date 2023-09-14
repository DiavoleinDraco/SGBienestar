import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./Textfield.css";
import { useState } from "react";

export default function Textfield({ name, required, onChange }) {
  const [error, setError] = useState('');

  const telefonoRegex = /^\+?(?:\d{1,3}[-\s])?\d{10,14}$/;

  const handleInputChange = (e) => {
    const fieldValue = e.target.value;
    onChange(fieldValue)
  };

  const handleBlur = (event) => {
    if (required && event.target.value === '') {
      setError('Este campo es obligatorio');
    } else if(name === 'Teléfono' && !telefonoRegex.test(event.target.value)){
      setError('Teléfono inválido');
    } else {
      setError(false)
    };
  };

  return (
    <div>
      <Box
        className="letras"
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "26ch" } 
        }}
        noValidate
        autoComplete="off"
        onBlur={handleBlur}
      >
        <div className="caj">
          <TextField
            id="standard-basic"
            label={name}
            variant="standard"
            onChange={handleInputChange}
            error={Boolean(error)}
            helperText={error}
          />
        </div>
      </Box>
    </div>
  );
};