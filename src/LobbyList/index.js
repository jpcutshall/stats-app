import React from 'react'

import { List, Button } from 'semantic-ui-react'


export default function LobbyList(props) {
    // console.log(props)
  const lobbies = props.lobbies.map(lobby => {
    return(
      <List key={lobby._id} selection verticalAlign='middle'>
        <List.Item>
          <List.Content>
            <List.Header>{lobby.name} hosted by {lobby.owner} (Win: ${lobby.prize})</List.Header>
            <Button primary onClick={ () => props.editLobby(lobby._id)}>Edit</Button>
            <Button primary onClick={ () => props.addPlayers(lobby._id)}>Add Players</Button>
            <Button primary onClick={ () => props.deleteLobby(lobby._id)}>Delete</Button>
          </List.Content>
        </List.Item>
      </List>
    )
  })
  return(
    <List.List>
      {lobbies}
    </List.List>
  )
}
