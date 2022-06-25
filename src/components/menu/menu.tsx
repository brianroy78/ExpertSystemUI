import React, { useEffect } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';


export default function SideMenu(props: any) {
  const [value, setValue] = React.useState(0);
  const [sideMenuProps, setProps] = React.useState(props)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    setProps(props);
  }, [props]);


  return (
    <Box className='side-box'>
      <Tabs
        className='side-tabs'
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        {sideMenuProps.links.map((value: any, index: number) => (
          <Tab
            key={index}
            className='side-tabs'
            component={Link}
            to={value.to}
            label={value.label}
          />
        ))}
      </Tabs>
    </Box>
  );
}
