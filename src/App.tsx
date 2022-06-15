import './App.css';
import SideMenu from './components/menu/menu';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import MainView from './components/main/main';
import VariableView from './components/variables';
import RulesView from './components/rules';
import InferenceView from './components/inference';
import Calculator from './components/calculator';
import { useEffect } from 'react';
import React from 'react';

function App(props: any) {
  const [AppProps, setProps] = React.useState(props)


  useEffect(() => {
    console.log('Props', window.location.href)
  }, [props]);

  return (
    <div id='main-div'>
      <Router>
        <SideMenu
          links={[
            { to: "/", label: 'Home' },
            { to: "/variable", label: 'Variables' },
            { to: "/rule", label: 'Reglas' },
            { to: "/inference", label: 'Inferencia' },
            { to: "/calculator", label: 'Calculador' },
          ]}
        />
        <div id="content-div" style={{ display: 'flex', margin: 'auto', padding: '20px', width: '100%' }}>
          <Routes>
            <Route path="/" element={<MainView />}></Route>
            <Route path="/variable" element={<VariableView />}></Route>
            <Route path="/rule" element={<RulesView />}></Route>
            <Route path="/inference" element={<InferenceView />}></Route>
            <Route path="/calculator" element={<Calculator />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
