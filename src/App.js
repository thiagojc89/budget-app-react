import React from 'react';
import './App.css';
import Header from './Header';
import MainComponent from './MainComponent';
import { Route, Switch } from 'react-router-dom';


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
  getUser = async () =>{
    // maybe this is necessary 
    // make a call to b/e and get up to date user info and store it in state at APP LEVEL 
  }

  appLogin = (userData) => {
    console.log("app login fired")
    // set state at app level based on a parameter 
    this.setState({
      email:userData.email,
      password:userData.password,
      first_name:userData.first_name,
      last_name:userData.last_name,
      logged:userData.logged
    })
  } 

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={ (props) => <Header {...props} 
                 appLogin={this.appLogin} /> }/>
          <Route exact path="/mainpage" component={MainComponent}/>

        </Switch>
      </div>
    );
  }
}
export default App;