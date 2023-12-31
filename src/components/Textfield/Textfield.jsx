import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./Textfield.css";
import { useState } from "react";

export default function Textfield({ name, required, onChange, inicial, soloNumeros, editable = true }) {
  const [error, setError] = useState('');
  const [data, setData] = useState('');
  const [errorTelefono, setErrorTelefono] = useState('');

  const telefonoRegex = /^\+?(?:\d{1,3}[-\s])?\d{10,14}$/;

  const handleInputChange = (e) => {
    const fieldValue = e.target.value;
    setData(fieldValue);
    if (typeof onChange === 'function') {
      onChange(fieldValue);
    }
  };

  const handleBlur = (e) => {
    e.preventDefault()
    if (required && data === '') {
      setError('Este campo es obligatorio.');
    } else {
      setError('');
    }

    if (name === 'Teléfono' && !telefonoRegex.test(data)) {
      setErrorTelefono('Teléfono inválido.');
    } else {
      setErrorTelefono('');
    }
  };

  return (
    <div>
      <Box
        className="letras"
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "29ch" }
        }}
        noValidate
        autoComplete="off"
        onBlur={handleBlur}
      >
        <div className="caj">
          <TextField
            id="standard-basic"
            label={name}
            defaultValue={inicial}
            variant="standard"
            onChange={handleInputChange}
            error={Boolean(error || errorTelefono)}
            helperText={error || errorTelefono}
            type={soloNumeros ? "number" : "text"}
            className={soloNumeros ? "no-spinners" : ""}
            disabled={!editable} // Deshabilitar el campo si editable es false
          />
        </div>
      </Box>
    </div>
  );
};