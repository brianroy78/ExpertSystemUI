import * as React from 'react';


export default function MainView() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <div style={{ display: 'flex', margin: 'auto' }}>
        <h1>Main View!!!!!</h1>
      </div>
    </React.Fragment>
  );
}
