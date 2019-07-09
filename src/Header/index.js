import React from 'react';
import { Form, Label, Button } from 'semantic-ui-react';


class Header extends React.Component {
	constructor(){
    super();

    this.state = {
      first_name: '',
      logged: false,
      username: null,
      password:null
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }
  handleLogin = async (e) => {
  	
    e.preventDefault();
    const loginResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/auth/login', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(this.state),
      headers: {
          'Content-Type': 'application/json'
        }
    });

    const parsedResponse = await loginResponse.json();



    // console.log(parsedResponse);
    if (parsedResponse.id){

      this.props.appLogin({
        first_name: parsedResponse.first_name,
        logged: true
      })
      this.setState({logged:true})
    }
    else{
      alert('USER OR PASSWORD INVALID!!!')
    }


  }

  regOrLog = (e)=>{
    e.preventDefault()

    this.props.showRegister()

  }
  logOut = async (e)=>{
    e.preventDefault()

    await fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/auth/logout', {
      method: 'GET',
      credentials: 'include'
    });


    // console.log(parsedResponse);

    this.setState({
      username: null,
      password: null
    })

    this.props.logOut()
  }
          
  render() {
    return (
      <div className="header">
        
        <div id='nav'>
          <div id='logo'>
            <Label>Money</Label>
            <Label>Chart</Label>
          </div>
        
        {
        	!this.props.logged ?
            <div className="login">
  		        <Form onSubmit={this.handleLogin}>
                <div>

  		            <Label> Email</Label>
  		            <Form.Input type='email' name="email" onChange={this.handleChange} />
  		            <Label> Password</Label>
  		            <Form.Input type='password' name="password" onChange={this.handleChange} />
  		            <Button className='btn log' type="Submit" color="green">Login</Button>  
                  <Button className='btn reg' type="Submit" onClick={this.regOrLog}>Register</Button>
                </div>
  		        </Form>
            </div>
		        : 
            <div className="login2">
                <div id='logout'>Hello {this.props.first_name}</div>
                <button className='btn logout' onClick={this.logOut}> (Log-Out)</button>
            </div>
                
      	}
          </div>
		        
      </div>
    );
  }
}
export default Header;

