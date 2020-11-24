import React, { Component } from 'react';
import './App.css';
import { Button } from 'semantic-ui-react'
import LobbyContainer from './LobbyContainer';
import NewLobbyForm from './NewLobbyForm';
import LobbyList from './LobbyList';
import LoginRegisterForm from './LoginRegisterForm';


export default class App extends Component {
  constructor() {
    super()

    this.state = {
      loggedIn: false,
      loggedInUsername: '' // might be helpful to track something to display
                           // "logged in as..."
    }
  }


register = async (registerInfo) => {
  console.log("register() in App.js called with the following info", registerInfo);
  const url = process.env.REACT_APP_API_URL + "/users/"

  try {
    const registerResponse = await fetch(url, {
      // now that our back end has sessions and is expecting cookies
      // INCLUDE THIS credentials: 'include' in every fetch call
      // it will send your cookie
      // in unit 2, this was being done automatically for you by the browser
      // IF YOU LEAVE IT OUT, YOU WILL NOT BE AUTHENTICATED
      credentials: 'include', // sends the cookie
      method: 'POST',
      body: JSON.stringify(registerInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log("registerResponse", registerResponse);
    const registerJson = await registerResponse.json()
    console.log("registerJson", registerJson);

     // hungry for more?
     // when user tries to register a duplicate username
     // display the "already registered" message from the server
     // on the screen in the form in red or something
     // and highlight the appropriate field

     if(registerResponse.status === 201) {
       this.setState({
         loggedIn: true,

         loggedInUsername: registerJson.username

       })
     }
  } catch(err) {
    console.error("Error trying to register with API")
    console.error(err)
  }
}

login = async (loginInfo) => {
  console.log("login() in App.js called with the following info", loginInfo);
  const url = process.env.REACT_APP_API_URL + '/sessions/'

  try {
    const loginResponse = await fetch(url, {
      credentials: 'include', // sends cookie
      method: 'POST',
      body: JSON.stringify(loginInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log("loginResponse", loginResponse);
    const loginJson = await loginResponse.json()
    console.log("loginJson", loginJson);

    if(loginResponse.status === 200) {
        this.setState({
          loggedIn: true,

          loggedInUsername: loginJson.username


        })
      }
  } catch(error) {
    console.error("Error trying to log in")
    console.error(error)
  }
}

logout = async (logout) => {
  try {
    const url = process.env.REACT_APP_API_URL + "/sessions/"

    const logoutResponse = await fetch(url, {
      method: 'DELETE',
      body: JSON.stringify(logout),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log("logoutResponse", logoutResponse);
    const logoutJson = await logoutResponse.json()
    console.log("logoutJson", logoutJson);

    if(logoutResponse.status === 200) {
      this.setState({
        loggedIn: false,
        loggedInUsername: ''
      })

    }

  } catch(error) {
    console.error("Error logging out")
    console.error(error)
  }
}

  render() {
    return (
      <div className="App">
        {
          this.state.loggedIn
          ?
          <React.Fragment>

          {/* <Button style={{align: 'right'}} onClick={this.logout}>Logout</Button> */}
          <LobbyContainer username={this.state.loggedInUsername}/>
          </React.Fragment>
          :
          <React.Fragment>
          <LoginRegisterForm
            login={this.login}
            register={this.register}
          />

          {/*   new lobby form goes above once lobbies are functional */}

          <LobbyContainer/>
          </React.Fragment>
        }
      </div>
    );
  }
}
