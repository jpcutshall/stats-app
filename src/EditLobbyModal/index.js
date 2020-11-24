import React, { Component } from 'react'
import { Form, Button, Label, Segment, Modal, Header } from 'semantic-ui-react'
import '../index.css'

export default class EditLobbyModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: props.lobbyToEdit.name,
      size: props.lobbyToEdit.size,
      prize: props.lobbyToEdit.prize
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.updateLobby(this.state)
  }

  render() {

    return(
      <Modal open={true} closeIcon={true} onClose={this.props.closeLobbyModal}>
        <Header>
          <h3>Enter new info</h3>
        </Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input
              type="text"
              name="name"
              value={this.state.name}
              placeholder="Enter a name"
              onChange={this.handleChange}
            />
            <Label>Size:</Label>
            <Form.Input
              type="text"
              name="size"
              value={this.state.size}
              placeholder="Change amount of players"
              onChange={this.handleChange}
            />
            <Label>Prize:</Label>
            <Form.Input
              type="text"
              name="prize"
              value={this.state.prize}
              placeholder="Enter amount of prize"
              onChange={this.handleChange}
            />
            <Modal.Actions>
              <Button type="Submit">Update Lobby</Button>
            </Modal.Actions>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}
