class Flash {

  // temporary object with leading underscore
  static _messages = null;

  static setMessage(type, message) {
    //create a messages object, use the arguments passed to create a key value pair of message type and the message
    this._messages = this._messages || {};
    this._messages[type] = message;
  }

  static getMessages() {
    //return the message object, it will have key value pairs or be empty as per setMessage()
    return this._messages;
  }

  static clearMessages(){
    //sets the messages object back to null like at the top of this file
    this._messages = null;
  }
}

export default Flash;

// class method as opposed to instance method
