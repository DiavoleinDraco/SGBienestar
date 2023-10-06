import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import MultipleSelect from '../../components/MultipleSelect/MultipleSelect';
import Textfield from '../../components/Textfield/Textfield';
import { useState, useEffect } from "react";


const drawerWidth = 380;  //MODIFICA EL TAMAÑO DE LA BARRA LATERAL

export default function Sanciones(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);  //ESTADOS DEL COMPONENTE DE OPCIONES




  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };




  //____________________________________________________

  //OPCIONES DEL COMPONENTE SELECT//


  const selectOptions = [
  { value: 'opcion1', label: 'Incumplimiento de la entrega del implemento' },
  { value: 'opcion2', label: 'Daño del implemento deportivo' },
  { value: 'opcion3', label: 'Faltas recurrentes por la entrega tardia del implemento ' },
  { value: 'opcion4', label: 'Uso indebido de la plataforma de prestamos' },
  { value: 'opcion5', label: 'Faltas reiterativas de las normas de uso' },
  ];

  //________________PARTE 2_____________________________

  const handleChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  //_________________________________________________


  // POST //
  const handlesanciones = async () => {
    const data = { usuario, description, estado };
    try {
      const response = await post("/sanciones", data);
      console.log("se ha creado la sancion con exito");
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };


//___________________________________________________

const drawer = (
  <div>
    <p>Sanciones </p>
    <Textfield
      className="son-codigo"
      name="ID"
    />
    <MultipleSelect
      options={selectOptions}
      selectedOptions={selectedOptions}
      onChange={handleChange}
    />
  </div>
);

  const container = window !== undefined ? () => window().document.body : undefined;

  //______________________________________________________________________


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${drawerWidth}px)`, //PARA AJUTAR EL HANCHO DE LA PAGINA PRINCIPAL
        }}
      >
        {/* LLAMAR AQUI AL CONTENIDO GENERAL*/}
      </Box>
    </Box>
  );
}

Sanciones.propTypes = {
  window: PropTypes.func,
};

