import React, {Component} from 'react';
import {ChatBar} from './Chatbar.jsx';
import {MessageList} from './MessageList.jsx';
import {Navbar} from './Navbar.jsx';

//App Component
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: "Annonymous",
      messages: [],
      currentUsersOnline: ""
    }
  }

//Creates the data object that will be sent to the Message Component alerting users who has changed their username, and to what
  addUser = username => {
    this.setState({currentUser: username});
    var newUserNotification = {type: "postNotification", content: `${this.state.currentUser} has changed their name to ${username}`};
    this.socket.send(JSON.stringify(newUserNotification));
  }

//Recieves the message typed by the user, adds the current username and that it is of type "postMessage".
//Stringify and send to server.
  addMessage = content => {
    var newestMessage = { username: this.state.currentUser, content, type: "postMessage"}
    this.socket.send(JSON.stringify(newestMessage));
  };

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onopen = () => {
      console.log('Connected to WebSocket');
    }

//Recieves data from server and extracts the .data property. Updates the relevant portions of the
//state depending on what type of information it is
    this.socket.onmessage = payload => {
      const json = JSON.parse(payload.data);

      switch(json.type){
        case "incomingMessage":
          var originalMessages = this.state.messages;
          var newMessages = [ ...originalMessages, json ];
          this.setState({ messages: newMessages });
          break;
        case "incomingNotification":
          var originalMessagesNotifications = this.state.messages;
          var newMessagesNotifications = [...originalMessagesNotifications, json];
          this.setState({messages: newMessagesNotifications });
          break;
        default:
          this.setState({currentUsersOnline: payload.data});
      }
    }

//Sends a "Welcome message" with simulated delay
    setTimeout(() => {
      const newMessage = {id: 1, username: "HelloBot", content: "I'm a Bot and my job is to say the first hello!", type:"incomingMessage"};
      const messages = this.state.messages.concat(newMessage);
      this.setState({messages: messages});
    }, 3000);
  }

//Render Components
  render() {
    return (
      <div>
      <div>
      <Navbar currentUsersOnline={this.state.currentUsersOnline}/>
      </div>
      <div>
        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage} addUser= {this.addUser} />
        <MessageList messages={this.state.messages} />
      </div>
      </div>
    );
  }
}

export default App;
