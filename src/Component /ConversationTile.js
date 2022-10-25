import React, { useState } from "react";
import Avatar from "./Avatar";
import { useEffect } from "react";

import axios from "axios";
const ConversationTile = ({ idCorespondant }) => {
  const [usercorepondant, setUsercorespondant] = useState();
  const getUsercoresponantInfos = () => {
    axios
      .get(`http://localhost:35000/user/${idCorespondant}`)
      .then((usercorepondant) => {
        setUsercorespondant(usercorepondant.data);
        console.log(usercorepondant.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getUsercoresponantInfos();
  }, []);

  return (
    <div className="conversationTile">
      <div className="user-profil">
        <Avatar url={usercorepondant && usercorepondant[0].profil} />
      </div>
      <div className="user-detail">
        <span className="user-name">
          {usercorepondant && usercorepondant[0].name}
        </span>
        <p className="message-label"></p>
      </div>
    </div>
  );
};

export default ConversationTile;
