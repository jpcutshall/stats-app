import React, { Component } from 'react'
import { Form, Button, Label, Input } from 'semantic-ui-react'
import '../index.css'

export default class LoginRegisterForm extends Component {

  constructor() {
    super()

    this.state = {
      password: '',
      username: '',
      action: 'Login' // this will track whether we are logging in or registering
    }
  }

switchForm = () => {
  if(this.state.action === "Login") {
    this.setState({ action: "Register" })
  } else {
    this.setState({ action: "Login" })
  }
}

handleChange = (event) => {
  this.setState({
    [event.target.name]: event.target.value
  })
}

handleSubmit = (event) => {
   event.preventDefault()
   console.log(`You are trying to ${this.state.action.toLowerCase()} with the following credentials`)
   console.log(this.state);
   if(this.state.action === "Register") {
      this.props.register(this.state)
    } else {
      this.props.login(this.state)
    }
 }

 render() {
  return (
  
    <React.Fragment>
     
       <div className='login'> 
      
      <Form onSubmit={this.handleSubmit}>
    
      
        <Form.Group inline>
         <Label>Username:</Label>
         <Input size='mini'
           type="text"
           name="username"
           placeholder="Enter a username"
           value={this.state.username}
           onChange={this.handleChange}
         />
     
        <Label>Password:</Label>
        <Input size='mini'
          type="password"
          name="password"
          placeholder="Enter a password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        
        <Button secondary
        size='mini'
        type="Submit">
          { this.state.action === "Login" ? "Login" : "Sign up"}
        </Button></Form.Group> 
      </Form></div>
      {
        
        this.state.action === "Login"
        ?
        <div style={{ padding: 5}}>
        <p align='left'>
          Need an account? Sign up <span className="fake-link" onClick={this.switchForm}>here</span>.
        </p>
        </div>
        :
        <div style={{ padding: 5}}>
        <p align='left'>
          Already have an account? Log in <span className="fake-link" onClick={this.switchForm}>here</span>.
        </p>
        </div>
      }
    </React.Fragment>
  )
}
}