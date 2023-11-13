import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TablaUsarios from '../TablaUsuarios/TablaUsuarios';

export default function NavTabs({ tabs }) {
  const [value, setValue] = React.useState(tabs[0].value);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%',typography: 'body1', height:"120vh"}}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1 ,alignSelf:"center", borderColor: 'divider',width: '100%'}}>
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