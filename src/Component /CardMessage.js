import React from "react";

const CardMessage = ({ message, direction }) => {
  return (
    <div className={`message  ${direction}`}>
      <p className="message-content  "> {message}</p>
    </div>
  );
};
//

export default CardMessage;
