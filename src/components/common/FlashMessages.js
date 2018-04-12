import React from 'react';
import Flash from '../../lib/Flash';

class FlashMessages extends React.Component {
  // create a variable called messages and store inside the messages we get when we run the method getMessages on the Flash class
  state = {
    messages: ''
  }

  componentWillUpdate() {
    const messages = Flash.getMessages();

    if(!messages) return false;

    this.setState({ messages });
    Flash.clearMessages();

    setTimeout(() => this.setState({ messages: '' }), 2000);
  }

  render() {
    return (
      <div id="flash-message">
        {/* <div className="container"> */}
        {/* get the keys from the messages variable then map over them finding the type from each -- can only give react an array to render */}
        {this.state.messages && Object.keys(this.state.messages).map(type =>
          // will print out the message that has the type danger eg. you must be logged in to do this
          <div key={type} className={`notification is-${type}`}>{this.state.messages[type]}</div>
        )}
      </div>
    );
  }
}

export default FlashMessages;
