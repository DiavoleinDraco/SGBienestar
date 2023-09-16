import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import './ComSelect.css';

export default function ComSelect({ descrip, items, nombre, required, onChange  }) {
  const [elementos, setElementos] = React.useState("");
  const [error, setError] = React.useState(false);

  const handleInputChange = (e) => {
    const fieldValue = e.target.value;
    setElementos(fieldValue);
    onChange(fieldValue);
  };

  const handleBlur = () => {
    if (required && elementos === "") {
      setError(true);
    } else {
      setError(false)
    };
  };

  return (
    <div>
      <FormControl className="comselect-imput" variant="standard" sx={{ m: 1, width: "200px" }} size="small">
        <InputLabel id="demo-simple-select-standard-label">{nombre}</InputLabel>
        <Select
          className="comselect"
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={elementos}
          label={nombre}
          onBlur={handleBlur}
          error={error}
          onChange={handleInputChange}
        >
          <MenuItem value=""
          className="esto">
            {descrip} <em>Opciones</em>
          </MenuItem>
          {items.map((element) => (
            <MenuItem key={element} value={element}>
              {element}
            </MenuItem>
          ))}
        </Select>
        {error && <p style={{ color: "RED" }}>Este campo es obligatorio.</p>}
      </FormControl>
    </div>
  );
}