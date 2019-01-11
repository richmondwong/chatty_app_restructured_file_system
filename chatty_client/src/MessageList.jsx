import React, {Component} from 'react';

import {Message} from './Message.jsx'


// export class MessageList extends Component {
//   render(){
//     console.log("This is props.messages: ", this.props.messages)
//     return (
//       <main className="messages">
//         {this.props.messages.map((msg, index) =>
//           <Message username={msg.username} key={index} content={msg.content} />
//         )}

//       </main>
//     )
//   }
// }


export class MessageList extends Component {
  render(){
    console.log("This is props.messages: ", this.props.messages)
    return (
      <main className="messages">
        {this.props.messages.map((msg, index) =>
          <Message username={msg.username} key={index} content={msg.content} type={msg.type}/>
        )}
      </main>
    )
  }
}

