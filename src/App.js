import React from 'react';
import './App.css';
import Header from './Header';
import { Route, Switch } from 'react-router-dom';


class App extends React.Component {
          
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Header}/>
        </Switch>
      </div>
    );
  }
}
export default App;