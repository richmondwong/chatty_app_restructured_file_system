import React, {Component} from 'react';

export class Message extends Component {
  render() {
    return (
      <div className={ this.props.type == "incomingMessage" ? "message" : "notification"}>
        <span className={ this.props.type == "incomingMessage" ? "message-username" : "notification-content"}>{this.props.username}</span>
        <span className="message-content">{this.props.content}</span>
      </div>
    )
  }
}