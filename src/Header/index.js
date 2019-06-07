import React from 'react';
import { Form, Label, Button } from 'semantic-ui-react';


class Header extends React.Component {
	constructor(){
    super();

    this.state = {
      email: '',
      password: '',
      first_name: '',
      last_name:'',
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

    // this.props.appLogin()

    this.props.history.push("/mainpage");

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
    console.log(parsedResponse);
    this.props.history.push("/mainpage");
  }
  regOrLog = (e)=>{
    e.preventDefault()
    if (this.state.logged){
      this.setState({logged:false})
    }else{

      this.setState({logged:true})
    }
  }
          
  render() {

    // console.log("header props")
    // console.log(this.props)
    // this.props.history.push("/mainpage");
    return (
      <div className="header">
        <h4>HEADER HERE!!!</h4>
        {
        	!this.state.logged ?
		        <Form onSubmit={this.handleLogin}>
		            <h1>Login</h1>
		            <Label> Email</Label>
		            <Form.Input type='email' name="email" onChange={this.handleChange} />
		            <Label> Password</Label>
		            <Form.Input type='password' name="password" onChange={this.handleChange} />
		            <Button type="Submit" color="green">Login</Button>
		            <h3>Don't Have an Acount?</h3>
		            <input type="Submit" color="green" value='Register' onClick={this.regOrLog} readOnly/>
		        </Form>
		        :
		        <Form onSubmit={this.handleRegister}>
		            <h1>Register</h1>
		            <Label> First Name</Label>
		            <Form.Input type='text' name="first_name" onChange={this.handleChange} />
		            <Label> Last Name</Label>
		            <Form.Input type='text' name="last_name" onChange={this.handleChange} />
		            <Label> Email</Label>
		            <Form.Input type='email' name="email" onChange={this.handleChange} />
		            <Label> Password</Label>
		            <Form.Input type='password' name="password" onChange={this.handleChange} />
		            <Button type="Submit" color="green">Register</Button>
		            <h3>Already Have an Acount?</h3>
		            <input type="Submit" color="green" value='Login' onClick={this.regOrLog}readOnly/>
		        </Form>
		        
      	}
      </div>
    );
  }
}
export default Header;



