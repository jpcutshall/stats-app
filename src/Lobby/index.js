import React from 'react'
import { Button, Card } from 'semantic-ui-react'
import NewPlayerForm from '../NewPlayerForm'

export default function Lobby(props) {
  const teams = props.lobbies.map(lobby => {
    return (
      <Card key={lobby.id}>
        <Card.Content textAlign={"center"}>
          <Card.Header>
            //team number
          </Card.Header>
        </Card.Content>
        <Card.Content textAlign={"center"}>
          <Card.Meta>
            //Player 1
          </Card.Meta>
        </Card.Content>
        <Card.Content textAlign={"center"}>
          <Card.Meta>
            //Player 2
          </Card.Meta>
        </Card.Content>
      </Card>
    )
  })

  return (
    <React.Fragment>
      <h1>{lobby.name}</h1>
      <h2>{lobby.description}</h2>
      <NewPlayerForm />
      <Card.Group centered={true}>
        {teams}
      </Card.Group>

    </React.Fragment>
  )
}
