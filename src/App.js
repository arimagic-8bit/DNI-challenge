import React, {Component} from 'react';
import { Switch, Route } from "react-router-dom";

import './App.css';

import Main from './pages/Main';
import Photo from './pages/Photo';

class App extends Component {
    render(){
      return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Main}/>
          <Route exact path="/photo" component={Photo} />
        </Switch>
      </div>
    );
  }
}

export default App;
