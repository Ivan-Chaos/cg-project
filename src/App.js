import './App.css';
import BrownianMotion from './Fractals/BrownianMotion/BrownianMotion';
import Plasma from './Fractals/Plasma/Plasma'
import MyNavbar from './Navs/MyNavbar'
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Misc/Home'
import {Card, Button, Col, Row} from 'react-bootstrap'

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import BrownianWrapper from './Wrappers/BrownianWrapper';
import PlasmaWrapper from './Wrappers/PlasmaWrapper';
import ColorsWrapper from './Wrappers/ColorsWrapper'



function App() {
  return (
    <Router>
      <MyNavbar />
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/brownian">
            <BrownianWrapper />
          </Route>
          <Route path ="/plasma">
            <PlasmaWrapper />
          </Route>
          <Route path ="/colors">
            <ColorsWrapper />
          </Route>

        </Switch>        
        {/*<Plasma  height={400} width={400} rectSize={0.25}/>
        <BrownianMotion height={400} width={400} fineness = {1} aggressiveness={3}/>*/}
      </div>
    </Router>
  );
}

export default App;
