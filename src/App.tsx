import { Backdrop, CircularProgress, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import {
  BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import './App.css';
import InferenceView from './components/inference';
import MainView from './components/main/main';
import SideMenu from './components/menu/menu';
import RulesView from './components/rules';
import VariableView from './components/variables';


function App(props: any) {
  const [AppProps, setProps] = React.useState(props)
  const [lockScreen, setLockScreen] = React.useState(false)


  useEffect(() => {
    console.log('Props', window.location.href)
  }, [props]);

  return (
    <Router>
      <Grid
        container
        justifyContent="space-evenly"
      >
        <Grid item xs={12}>
          <div id='top-bar' style={{ height: '80px' }}></div>
        </Grid>
        <Grid item xs={2}>
          <SideMenu
            links={[
              { to: "/", label: 'Home' },
              { to: "/variable", label: 'Variables' },
              { to: "/rule", label: 'Reglas' },
              { to: "/inference", label: 'Cotización' },
            ]}
          />
        </Grid>

        <Grid item xs={10}>
          <Routes>
            <Route path="/" element={<MainView />}></Route>
            <Route path="/variable" element={<VariableView />}></Route>
            <Route path="/rule" element={<RulesView />}></Route>
            <Route path="/inference" element={<InferenceView setLockScreen={setLockScreen} />}></Route>
          </Routes>
        </Grid>
      </Grid>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={lockScreen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Router>
  );
}

export default App;
