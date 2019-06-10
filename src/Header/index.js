import React from 'react';
import { Form, Label, Button } from 'semantic-ui-react';


class Header extends React.Component {
	constructor(){
    super();

    this.state = {
      first_name: '',
      logged: false
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }
  handleLogin = async (e) => {
  	console.log("hiting login handler in header Component");
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



    console.log(parsedResponse);
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

  handleRegister = async (e) => {
  	console.log("hiting login handler in header Component");
    e.preventDefault();
    const registerResponse = await fetch(process.env.REACT_APP_BACKEND_URL + '/api/v1/auth/register', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(this.state),
      headers: {
          'Content-Type': 'application/json'
        }
    });

    const parsedResponse = await registerResponse.json();

  }
  regOrLog = (e)=>{
    e.preventDefault()
    if (this.state.logged){
      this.setState({logged:false})
    }else{

      this.setState({logged:true})
    }
  }
  logOut(e){
    e.preventDefault()
    console.log('LOGOFFFFFFFF');
  }
          
  render() {
    return (
      <div className="header">
        
        <div id='nav'>
        <p id='logo'><strong>Money Chart</strong></p>
        
        {
        	!this.state.logged ?
            <div>
  		        <Form onSubmit={this.handleLogin}>
  		            <Label> Email</Label>
  		            <Form.Input type='email' name="email" onChange={this.handleChange} />
  		            <Label> Password</Label>
  		            <Form.Input type='password' name="password" onChange={this.handleChange} />
  		            <Button type="Submit" color="green">Login</Button>
  		        </Form>
  		        <p id='register'><small>Don't Have an Acount?</small>
  		          <input type="Submit" value='Register' onClick={this.regOrLog} readOnly/>
              </p>
            </div>
		        :
                <h2 id='logout'>Hello {this.props.first_name}
                  <button className='btn logout' onClick={this.logOut}> (Log-Out)</button>
                </h2>
      	}
          </div>
		        
      </div>
    );
  }
}
export default Header;


