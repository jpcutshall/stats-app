import React, { Component } from 'react'
import { Form, Button, Label, Segment } from 'semantic-ui-react'

import EditLobbyModal from '../EditLobbyModal'
import NewLobbyForm from '../NewLobbyForm'
import LobbyList from '../LobbyList'
import AddPlayerModal from '../AddPlayerModal'

// console.log(process.env.NODE_ENV)
// let baseUrl = ''

// if (process.env.NODE_ENV === 'development') {
//   baseUrl = 'http://localhost:3003'
// } else {
//   baseUrl = 'heroku url here'
// }

// console.log('current base URL:', baseUrl)

export default class LobbyContainer extends Component {



  constructor(props) {
    super(props)
    this.state = {

      lobbies: [],
      idOfLobbyToEdit: -1,
      idOfLobbyToEditForPlayer: -1,

    }
  }

  
  
  componentDidMount() {
    console.log("componentDidMount() in LobbyContainer is running")
    // This will get the lobbys when the component is rendered
    this.getLobbies()
    console.log(this.getLobbies());
  }
// We will need to add the getLobbys function here
  getLobbies = async () => {
    try{
      const url = process.env.REACT_APP_API_URL + "/lobbies/"
      const lobbiesResponse = await fetch(url)
      const lobbiesJson = await lobbiesResponse.json()

      this.setState({
        lobbies: lobbiesJson

      })

    } catch(err) {
      console.log("Error getting lobby data.", err)
    }
  }

  deleteLobby = async (idOfLobbyToDelete) => {
      // console.log(idOfDogToDelete)
      // it should send a request to delete dog

      try {
        const url = process.env.REACT_APP_API_URL + "/lobbies/" + idOfLobbyToDelete

        const deleteLobbyResponse = await fetch(url, {
          method: 'DELETE'
        })
        const deleteLobbyJson = await deleteLobbyResponse.json()
        console.log("deleteLobbyJson", deleteLobbyJson)

        if(deleteLobbyResponse.status === 200) {

          this.getLobbies()

        }
      } catch(err) {
        console.log("Error deleting lobby: ", err)
      }

    }

  createLobby = async (lobby) => {
    // console.log("here is the dog you want to add")
    // console.log(dogToAdd)
    try {
      const url = process.env.REACT_APP_API_URL + "/lobbies/"
      const createLobbyResponse = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(lobby)
      })
      const lobbyJson = await createLobbyResponse.json()
      console.log(lobbyJson)

      if(createLobbyResponse.status === 201 || createLobbyResponse.status === 200){
        this.setState({
          lobbies: [...this.state.lobbies, lobbyJson]
        })
      }


    } catch(err) {
      console.log("Error adding dog", err)
    }
  }



  editLobby = (idOfLobbyToEdit) => {
    console.log("you are trying to edit Lobby with id: ", idOfLobbyToEdit)
    this.setState({
      idOfLobbyToEdit: idOfLobbyToEdit
    })
  }

  updateLobby = async (updatedLobbyInfo) => {
    try {
      const url = process.env.REACT_APP_API_URL + "/lobbies/" + this.state.idOfLobbyToEdit

      const updateLobbyResponse = await fetch(url, {
        credentials: 'include',
        method: 'PUT',
        body: JSON.stringify(updatedLobbyInfo),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      console.log("updateLobbyResponse", updateLobbyResponse)
      const updateLobbyJson = await updateLobbyResponse.json()
      console.log("updateLobbyJson", updateLobbyJson)

      if(updateLobbyResponse.status === 200) {
        const lobbies = this.state.lobbies
        const indexOfLobbyBeingUpdated = lobbies.findIndex(lobby => lobby._id === this.state.idOfLobbyToEdit)
        lobbies[indexOfLobbyBeingUpdated] = updateLobbyJson
        this.setState({
          lobbies: lobbies,
          idOfLobbyToEdit: -1 // close the modal
        })
      }

    } catch(err) {
      console.log("Error updating dog info: ", err)
    }
  }
  closeLobbyModal = () => {
    this.setState({
      idOfLobbyToEdit: -1
    })
  }

  addPlayers = (idOfLobbyToEditForPlayer) => {
    console.log("You are trying to add a player to lobby with id: ", idOfLobbyToEditForPlayer)
    this.setState({
      idOfLobbyToEditForPlayer: idOfLobbyToEditForPlayer
    })
  }



  updatePlayer = async (updateLobbyInfo) => {
    try {
      const url = process.env.REACT_APP_API_URL + "/lobbies/" + this.state.idOfLobbyToEditForPlayer
      const updatePlayerResponse = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(updateLobbyInfo),
        headers: {
          'Content-Type': 'application.json'
        }
      })
      console.log("updatePlayerResponse", updatePlayerResponse)
      const updatePlayerJson = await updatePlayerResponse.json()
      console.log("updatePlayerJson", updatePlayerJson)
      if(updatePlayerResponse.status === 200) {
        const lobbies = this.state.lobbies
        const indexOfLobbyBeingUpdated = lobbies.findIndex(lobby => lobby._id === this.state.idOfLobbyToEditForPlayer)
        lobbies[indexOfLobbyBeingUpdated] = updatePlayerJson
        this.setState({
          lobbies: lobbies,
          idOfLobbyToEditForPlayer: -1
        })
      }
    } catch(err) {
      console.log("Error adding player: ", err)
    }
  }


  closePlayerModal = () => {
    this.setState({
      idOfLobbyToEditForPlayer: -1
    })
  }
// deleteLobby will go here. We will want to make it so that the creator is only able to delete
// createLobby
// editLobby
// updateLobby
// closeModal??? I think i missed this part of the lecture. I will rewatch unless one of you guys can tell me what it does

  render() {
    return (
      <React.Fragment>
        <NewLobbyForm createLobby={this.createLobby} 
        username={this.props.username}/>
        <h2>Tournaments</h2>
        <LobbyList
        lobbies={this.state.lobbies}
        editLobby={this.editLobby}
        addPlayers={this.addPlayers}
        deleteLobby={this.deleteLobby}
        
        />

        {
          this.state.idOfLobbyToEdit !== -1
          &&
            <EditLobbyModal
            key={this.state.idOfLobbyToEdit}
            lobbyToEdit={this.state.lobbies.find((lobby) => lobby._id === this.state.idOfLobbyToEdit)}
            updateLobby={this.updateLobby}
            closeLobbyModal={this.closeLobbyModal}
            />
        }
        {
          this.state.idOfLobbyToEditForPlayer !== -1
          &&
            <AddPlayerModal
            key={this.state.idOfLobbyToEditForPlayer}
            playerToAdd={this.state.lobbies.find((lobby) => lobby._id === this.state.idOfLobbyToEditForPlayer)}
            updatePlayer={this.updatePlayer}
            closePlayerModal={this.closePlayerModal}
            />
        }
      </React.Fragment>
    )
  }
}
