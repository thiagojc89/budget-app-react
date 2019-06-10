import React from 'react';
import { Form, Label, Button } from 'semantic-ui-react';


class Register extends React.Component {
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


    this.props.appLogin({
      email:this.state.email,
      first_name:this.state.first_name,
      last_name:this.state.last_name,
      logged:true
    })

  }
          
  render() {

    return (
      <div className="Register">
        

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
		            <Button className='btn reg'type="Submit" color="green">Register</Button>
		        </Form>
		        
      	
      </div>
    );
  }
}
export default Register;



