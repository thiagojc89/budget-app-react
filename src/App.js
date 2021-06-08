import React from 'react';
import './App.css';
import Header from './Components/Header';
import HomePage from './Components/HomePage';
import Footer from './Components/Footer';
import MainComponent from './Components/MainComponent';
import RegisterComponent from './Components/RegisterComponent';


class App extends React.Component {
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
      credentials: 'include'
    });

    const parsedResponse = await loginResponse.json();

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
            <Footer/>
          
        </div>
      );
    }
  }


export default App;



