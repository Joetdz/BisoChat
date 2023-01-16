import React, { useState, useEffect, useContext } from "react";
import ConversationTile from "./ConversationTile";
import SearchForm from "./SearchForm";
import axios from "axios";
import { generalContext } from "../GeneralContext";
import Loader from "./Loadercomponent";

const ConversationsSection = () => {
  const { conversations, setConversations } = useContext(generalContext);
  const { userconnectedInfo } = useContext(generalContext);
  const [isLoading, setIsLoading] = useState(true);
  const { currentToken, setCurrentToken } = useContext(generalContext);
  console.log(currentToken);

  const getConversations = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/message/conversations/${
        userconnectedInfo && userconnectedInfo._id
      }`,
      responseType: "json",
      headers: {
        Authorization: `${currentToken}`,
      },
    }).then((data) => {
      setConversations(data.data);
      setIsLoading(false);
      console.log("converstions", data.data);
    });
  };

  useEffect(() => {
    setCurrentToken(window.localStorage.getItem("token"));
    if (currentToken) getConversations();
  }, [userconnectedInfo]);

  return (
    <div className="conversationsSection">
      <div className="search-form">
        <SearchForm />
      </div>
      <div className="recently-conversations">
        <div className="tilte">Recent</div>

        {isLoading ? (
          <div className="loader">
            <Loader />
          </div>
        ) : (
          <>
            {" "}
            <div className="conversations">
              {conversations.map((conversation) => {
                return (
                  <ConversationTile
                    idConversation={conversation._id}
                    idCorespondant={conversation.corespondant}
                    key={conversation}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ConversationsSection;
