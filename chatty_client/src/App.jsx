import React, {Component} from 'react';
import {ChatBar} from './Chatbar.jsx'
import {MessageList} from './MessageList.jsx'
import {Navbar} from './Navbar.jsx'

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      // currentUser: {name: "Joe"},
      currentUser: "Annonymous",
      messages: [],
      currentUsersOnline: ""
      // messages: [
      // {
      //   username: "Mike",
      //   content: "Hello hello",
      //   id: "001"
      // },
      // {
      //   username: "Mary",
      //   content: "Whaddup whaddup",
      //   id: "002"
      // },
      // {
      //   username: "Pablo",
      //   content: "hi there",
      //   id: "003"
      // }
      // ]
    }
  }

  getCurrentState = () => {
    this.setState((state) => ({
      currentUser: state.currentUser
    }));
  }

  addUser = username => {
    this.setState({currentUser: username})
    var newUserNotification = {type: "postNotification", content: `${this.state.currentUser} has changed their name to ${username}`}
    this.socket.send(JSON.stringify(newUserNotification))
  }

  addMessage = content => {
    // var originalMessages = this.state.messages;
    // var originalUsers = this.state.messages.username;
    // var newMessages = [
    //   ...originalMessages,
    //   { username: "Placeholder", content, id: "tempID" }
    // ];
    // this.setState({ messages: newMessages });

    // var newestMessage = { username: "Placeholder", content, id: "tempID" }
    // var newestMessage = { username: this.state.currentUser.name, content}

    var newestMessage = { username: this.state.currentUser, content, type: "postMessage"}
    this.socket.send(JSON.stringify(newestMessage))
  };

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001')

    this.socket.onopen = () => {
      console.log('Connected to WebSocket')
    }

    this.socket.onmessage = payload => {
      console.log("Incoming server payload at app.js", payload);
      const json = JSON.parse(payload.data)
      console.log("This is the wss?:" , payload.data)
// INCOMING MESSAGES //////
    // var originalUsers = this.state.messages.username;


      switch(json.type){
        case "incomingMessage":
        // handle incpoming message
          var originalMessages = this.state.messages;
          var newMessages = [ ...originalMessages, json ];
          this.setState({ messages: newMessages });
          // console.log(this.state.messages)
          break;
        case "incomingNotification":
        //handle incoming notification
          var originalMessagesNotifications = this.state.messages;
          var newMessagesNotifications = [...originalMessagesNotifications, json]
          this.setState({messages: newMessagesNotifications })
          break;
        default:
          this.setState({currentUsersOnline: payload.data})

          // throw new Error ("Unknown event type :", json.type)
      }
    }

    // console.log("componentDidMount <App />");
    setTimeout(() => {
      // console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 1, username: "HelloBot", content: "I'm a Bot and my job is to say the first hello!", type:"incomingMessage"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
  }


  render() {

    console.log("In render: ", this.state.currentUser)
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
