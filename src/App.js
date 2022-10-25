import "./App.scss";
import { generalContext } from "./GeneralContext";
import Home from "./Pages/Home";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import React, { useState } from "react";

function App() {
  const [sectionContactSelected, setSectionContactSelected] = useState(false);
  const [logIn, setLogIn] = useState(false);
  const [signUpSelected, SetSingUpSelected] = useState(false);
  console.log(signUpSelected);
  const [currentUserId, setCurrentUserId] = useState();
  const [currentConversationWife, setCurrentConversationWife] = useState({});
  const [contacts, setContacts] = useState();
  const [userconnectedInfo, setUserConnectedInfo] = useState();
  const [conversations, setConversations] = useState();
  const [loadingUserConnectedInfo, setloadingUserConnectedInfo] =
    useState(true);

  return (
    <generalContext.Provider
      value={{
        sectionContactSelected,
        setSectionContactSelected,
        logIn,
        setLogIn,
        currentUserId,
        setCurrentUserId,
        signUpSelected,
        SetSingUpSelected,
        currentConversationWife,
        setCurrentConversationWife,
        contacts,
        setContacts,
        userconnectedInfo,
        setUserConnectedInfo,
        conversations,
        setConversations,
        loadingUserConnectedInfo,
        setloadingUserConnectedInfo,
      }}
    >
      {logIn ? <Home /> : signUpSelected ? <Signup /> : <Login />}
    </generalContext.Provider>
  );
}

export default App;
