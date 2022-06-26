import { Grid } from '@mui/material';
import * as React from 'react';


export default function MainView() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid
      container
      spacing={4}
      justifyContent="space-evenly"
    >
      <Grid>
        <h2>Bienvenido al sistema de cotización de paneles solares!</h2>
      </Grid>
    </Grid>
  );
}
