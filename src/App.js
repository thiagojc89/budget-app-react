import React from 'react';
import './App.css';
import Header from './Header';
import HomePage from './HomePage';
import MainComponent from './MainComponent';
// import { Route, Switch } from 'react-router-dom';


class App extends React.Component {
  // constructor -- logged in -- username

  // function to lift up state from Header?
  constructor (){
    super()

    this.state = {
      email: '',
      first_name: '',
      last_name:'',
      logged: false
    }
  }
  appLogin = (userData) => {
    
    // set state at app level based on a parameter 
    this.setState({
      email:userData.email,
      first_name:userData.first_name,
      last_name:userData.last_name,
      logged:userData.logged
    })
  } 
  render() {
      return (
        <div className="App">
          
            <Header appLogin={this.appLogin} first_name={this.state.first_name} /> 

            {this.state.logged?
              <MainComponent/>
            :
              <HomePage/>
            }

          
        </div>
      );
    }
  }


export default App;



