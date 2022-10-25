import React, { useContext } from "react";
import { generalContext } from "../GeneralContext";
import Avatar from "./Avatar";
import axios from "axios";

const ContactTile = ({ name, image, _id }) => {
  const { currentConversationWife, setCurrentConversationWife } =
    useContext(generalContext);
  console.log(currentConversationWife);
  const { userconnectedInfo } = useContext(generalContext);

  const addConversation = () => {
    axios({
      method: "post",
      url: "http://localhost:35000/convAdd",
      data: {
        moi: userconnectedInfo._id,
        corespondant: _id,
      },
    })
      .then((conversationCree) => {
        console.log(conversationCree.data);
        setCurrentConversationWife(conversationCree.data[0]);
        console.log(currentConversationWife);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="conversationTile" onClick={addConversation}>
      <div className="user-profil">
        <Avatar url={image} />
      </div>
      <div className="user-detail">
        <span className="user-name">{name}</span>
        <p className="message-label"></p>
      </div>
    </div>
  );
};

export default ContactTile;
