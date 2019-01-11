import React, {Component} from 'react';

// export class Message extends Component {
//   render() {
//     console.log("This is props inside MESSAGE:", this.props)
//     return (
//       <div className="message">
//         <span className="message-username">{this.props.username}</span>
//         <span className="message-content">{this.props.content}</span>
//       </div>
//     )
//   }
// }


export class Message extends Component {
  render() {
    console.log("This is props inside MESSAGE:", this.props)
    return (
      <div className={ this.props.type == "incomingMessage" ? "message" : "notification"}>
        <span className={ this.props.type == "incomingMessage" ? "message-username" : "notification-content"}>{this.props.username}</span>
        <span className="message-content">{this.props.content}</span>
        <span>{this.props.currentUsersOnline}</span>
      </div>
    )
  }
}



{/* <div className="notification">
          <span className="notification-content">
      </span>
        </div>*/}