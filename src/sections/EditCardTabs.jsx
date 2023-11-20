import React, { useState } from 'react'
import { Box, Tab, Tabs, Typography } from '@mui/material'
import ElementsCardTab from './ElementsCardTab';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            {children}
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

const EditCardTabs = () => {
    const [value, setValue] = useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    
  return (
    <div style={{ flex: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', maxWidth: '92vw' }}>
            <Tabs 
                scrollButtons="auto" variant='scrollable' value={value} onChange={handleChange} 
                aria-label="scrollable tabs example"
            >
                <Tab label="Elementos" {...a11yProps(0)} />
                <Tab label="Botones" {...a11yProps(1)} />
                <Tab label="Servicios" {...a11yProps(2)} />
            </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
            <ElementsCardTab/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
            Botones
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
            Servicios
        </CustomTabPanel>
    </div>
  )
}

export default EditCardTabs