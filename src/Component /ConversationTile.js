import React, { useState } from "react";
import Avatar from "./Avatar";
import { useEffect } from "react";

import axios from "axios";
const ConversationTile = ({ idCorespondant }) => {
  const [usercorepondant, setUsercorespondant] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(usercorepondant[0]);
  const getUsercoresponantInfos = () => {
    axios
      .get(`http://localhost:35000/user/${idCorespondant}`)
      .then((usercorepondant) => {
        setUsercorespondant(usercorepondant.data);
        setIsLoading(false);
        console.log(usercorepondant);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getUsercoresponantInfos();
  }, []);

  return (
    <div className="conversationTile list">
      <div className="user-profil">
        {isLoading ? (
          ""
        ) : (
          <Avatar url={usercorepondant[0] && usercorepondant[0].profil} />
        )}
      </div>

      <div className="user-detail">
        <span className="user-name">
          {/* {usercorepondant[0].name && usercorepondant[0].name} */}Joel
        </span>
        <p className="message-label">gdggdgdggdtgdtytttttttttttttyytttt</p>
      </div>
    </div>
  );
};

export default ConversationTile;
