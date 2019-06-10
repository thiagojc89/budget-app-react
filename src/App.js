import React from 'react';
import './App.css';
import Header from './Header';
import HomePage from './HomePage';
import MainComponent from './MainComponent';
import RegisterComponent from './RegisterComponent';
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
      logged: false,
      showRegister: false
    }
  }
  componentDidMount(){
    this.getUser()
  }
  getUser = async ()=>{
    const loginResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/auth/login', {
      method: 'GET',
      credentials: 'include',
    });

    const parsedResponse = await loginResponse.json();

    console.log(parsedResponse);

    if (parsedResponse[0]==='true'){

      this.setState({
        first_name: parsedResponse[1].first_name,
        logged: true,
        showRegister: false
      })

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
  logOut = ()=>{
      this.setState({
        email:null,
        first_name:null,
        last_name:null,
        logged:null,
        showRegister:false
    })
  }
  showRegister = ()=>{
    this.setState({showRegister:true})
  }
  render() {
      return (
        <div className="App">
          
            <Header appLogin={this.appLogin} 
                    first_name={this.state.first_name} 
                    logged={this.state.logged}
                    logOut={this.logOut}
                    showRegister={this.showRegister}/> 

            {this.state.logged?
              <MainComponent/>
            :
              <div>
              {this.state.showRegister?
                <RegisterComponent appLogin={this.appLogin} />
                :
                <HomePage/>
              }
              </div>
            }
          
        </div>
      );
    }
  }


export default App;



