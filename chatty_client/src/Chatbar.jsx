import React, {Component} from 'react';

const DEFAULT_MESSAGE = { message: "" };

export class ChatBar extends Component {

  constructor(props){
    super(props)
    this.state = { message: "",
                   username: ""
                 }
  }

  onChange = e => {
    const inputText = e.target.value
    this.setState({message: inputText})
  }

  onKeyUp = e => {
    if (e.keyCode === 13){
      this.props.addMessage(this.state.message)
      this.setState({ message: "" })
    }
  }

  onChangeUser = e => {
    const inputUsername = e.target.value
    this.setState({username: inputUsername })
  }

  onKeyUpUser = e => {
    if (e.keyCode === 13){
      this.props.addUser(this.state.username)
    }
  }

  render(){
    return (
      <footer className="chatbar">
          <input
            className="chatbar-username"
            placeholder="Your Name (Optional)"
            value={this.state.username}
            name="usernameInput"
            onKeyUp={this.onKeyUpUser}
            onChange={this.onChangeUser} />
          <input
            className="chatbar-message"
            value={this.state.message}
            name="messageInput"
            onKeyUp={this.onKeyUp}
            onChange={this.onChange}
            placeholder="Type a message and hit ENTER"
          />
      </footer>
      )
  }
}