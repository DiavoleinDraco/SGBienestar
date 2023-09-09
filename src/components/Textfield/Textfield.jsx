import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./Textfield.css";
import { useState } from "react";

export default function Textfield({ name, required, onChange }) {
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const fieldValue = e.target.value;
    onChange(fieldValue); // Llama a la función onChange pasando el valor del campo
  };

  const handleBlur = (event) => {
    if (required && event.target.value === "") {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <div>
      <Box
        className="letras"
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" }
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
          />
        </div>
      </Box>
    </div>
  );
}
