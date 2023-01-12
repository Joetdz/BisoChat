import React, { useContext } from "react";
import { generalContext } from "../GeneralContext";
import Avatar from "./Avatar";
import axios from "axios";

const ContactTile = ({ name, image, _id }) => {
  const { currentConversationWife, setCurrentConversationWife } =
    useContext(generalContext);

  const { userconnectedInfo } = useContext(generalContext);
  const { currentConversationUserDetail, setCurrentConversationUserDetail } =
    useContext(generalContext);
  const { currentToken } = useContext(generalContext);
  console.log(currentConversationUserDetail);

  const addConversation = () => {
    console.log("les id corespond converstion courant ", _id);

    console.log("utilisateur connecté", userconnectedInfo._id);
    console.log(currentConversationWife);
    axios({
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/message/convAdd`,
      data: {
        moi: userconnectedInfo._id,
        corespondant: _id,
      },
      headers: {
        Authorization: `${currentToken}`,
      },
    })
      .then((conversationCree) => {
        console.log(conversationCree.data);
        setCurrentConversationWife(conversationCree.data[0]);
        console.log(currentConversationWife);
        setCurrentConversationUserDetail([image, name]);
      })
      .catch((error) => {
        console.log(error);
      })
      .catch((error) => console.log(error));
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
