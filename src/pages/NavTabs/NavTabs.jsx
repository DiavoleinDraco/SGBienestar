import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TablaUsarios from '../TablaUsuarios/TablaUsuarios';

export default function NavTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1', position:"relative", left:"40px"}}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider',position:"relative", left:"310px",width: '500px',outline:"1px solid black"}}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Usuarios" value="1" />
            <Tab label="Sanciones" value="2" />
            <Tab label="No sé" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <TablaUsarios />
        </TabPanel>
        <TabPanel value="2">Aquí van las sanciones</TabPanel>
        <TabPanel value="3">Aquí no sé</TabPanel>
      </TabContext>
    </Box>
  );
}