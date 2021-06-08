import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './Components/Header';
import HomePage from './Components/HomePage';
import Footer from './Components/Footer';
import MainComponent from './Components/MainComponent';
import RegisterComponent from './Components/RegisterComponent';


function App(){
  const [email, setEmail] = useState('')
  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [logged, setLogged] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  useEffect(() => {
    console.log('is this running');
    getUser()
  },[]);

  const getUser = async ()=>{
    const loginResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/auth/login', {
      method: 'GET',
      credentials: 'include'
    });

    const parsedResponse = await loginResponse.json();

    if (parsedResponse[0]==='true'){
      setFirstName(parsedResponse[1].first_name)
      setLogged(true)
      setShowRegister(true)
    }
  }
  const appLogin = (userData) => {
    setEmail(userData.email)
    setFirstName(userData.first_name)
    setLastName(userData.last_name)
    setLogged(userData.logged)
    
  }
  const logOut = ()=>{
    setEmail(null)
    setFirstName(null)
    setLastName(null)
    setLogged(null)
    setShowRegister(false)
  }
  const Register = ()=>{
    setShowRegister(true)
    // this.setState({showRegister:true})
  }

  return (
        <div className="App">
          
            <Header appLogin={appLogin} 
                    first_name={first_name} 
                    logged={logged}
                    logOut={logOut}
                    showRegister={Register}/> 

            {logged?
              <MainComponent/>
            :
              <div>
              {showRegister? <RegisterComponent appLogin={appLogin} />
                :
                <HomePage/>
              }
              </div>
            }
            <Footer/>
          
        </div>
      )}


export default App;



