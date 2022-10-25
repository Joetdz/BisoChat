import React, { useState, useEffect, useContext } from "react";
import ConversationTile from "./ConversationTile";
import SearchForm from "./SearchForm";
import axios from "axios";
import { generalContext } from "../GeneralContext";

const ConversationsSection = () => {
  const { conversations, setConversations } = useContext(generalContext);
  const { userconnectedInfo } = useContext(generalContext);

  const [isLoading, setIsLoading] = useState(true);

  const getConversations = () => {
    axios({
      method: "get",
      url: `http://localhost:35000/conversations/${
        userconnectedInfo && userconnectedInfo._id
      }`,
      responseType: "json",
    }).then((data) => {
      setConversations(data.data);
      setIsLoading(false);
      console.log("converstions", data.data);
    });
  };

  useEffect(() => {
    getConversations();
  }, [userconnectedInfo]);

  return (
    <div className="conversationsSection">
      <div className="search-form">
        <SearchForm />
      </div>
      <div className="recently-conversations">
        <div className="tilte">Recent</div>
        <div className="conversations">
          {isLoading
            ? ""
            : conversations.map((conversation) => {
                return (
                  <ConversationTile
                    idConversation={conversation._id}
                    idCorespondant={conversation.corespondant}
                    key={conversation._id}
                  />
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default ConversationsSection;
