import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TablaUsarios from '../TablaUsuarios/TablaUsuarios';
import { margin } from '@mui/system';
import './NavTabs.css';


export default function NavTabs({ tabs }) {
  const [value, setValue] = React.useState(tabs[0].value);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box  sx={{ width:'90%', typography: 'body1', background:"#e3e3e3",}}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '50%', margin:"auto"}}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {tabs.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </TabList>
        </Box>
        {tabs.map((tab) => (
          <TabPanel key={tab.value} value={tab.value}>
            {tab.content}
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
};