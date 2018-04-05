import React from 'react';
import Flash from '../../lib/Flash';

const FlashMessages = () => {
  // create a variable called messages and store inside the messages we get when we run the method getMessages on the Flash class
  const messages = Flash.getMessages();
  Flash.clearMessages();
  return (
    <div>
    {/* <div className="container"> */}
      {/* get the keys from the messages variable then map over them finding the type from each -- can only give react an array to render */}
      {messages && Object.keys(messages).map((type, i) =>
        // will print out the message that has the type danger eg. you must be logged in to do this
        <div key={i} className={`notification is-${type}`}>{messages[type]}</div>
      )}
    </div>
  );
};

export default FlashMessages;
