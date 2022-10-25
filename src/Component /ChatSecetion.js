import React, { useContext } from "react";
import ContactTile from "./ContactTile";
import SenderMessageForm from "./SenderMessageForm";
import CardMessage from "./CardMessage";
import { generalContext } from "../GeneralContext";

const ChatSecetion = () => {
  const { currentConversationWife } = useContext(generalContext);

  return (
    <div className="chatSection">
      <div className="user-info">
        <ContactTile
          name={currentConversationWife.name}
          image={currentConversationWife.image}
          label={"En ligne"}
        />
      </div>
      <div className="messages-container">
        <CardMessage pointer="me" message="" />
      </div>
      <div className="sender-messages-container">
        <SenderMessageForm />
      </div>
    </div>
  );
};

export default ChatSecetion;
