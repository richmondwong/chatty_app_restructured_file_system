import React, {Component} from 'react';

export class Navbar extends Component {
  render(){
    return (
      <nav className="navbar">
      <div>
        <a href="/" className="navbar-brand">Chatty</a>
        </div>
        <div className="online-box">
        <span className="online-users"><b>Users Currently Online: {this.props.currentUsersOnline}</b></span>
        </div>
      </nav>
    )
  }
}