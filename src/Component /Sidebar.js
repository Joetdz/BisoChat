import React, { useContext, useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { AiFillMessage } from "react-icons/ai";
import { IoIosContacts } from "react-icons/io";
import { generalContext } from "../GeneralContext";
import axios from "axios";

import Avatar from "./Avatar";

const Sidebar = () => {
  const { setSectionContactSelected } = useContext(generalContext);
  const { setLogIn } = useContext(generalContext);
  const { currentUserId } = useContext(generalContext);
  const { userconnectedInfo, setUserConnectedInfo } =
    useContext(generalContext);
  const { loadingUserConnectedInfo, setloadingUserConnectedInfo } =
    useContext(generalContext);
  console.log(userconnectedInfo);

  const getUserconnected = () => {
    axios
      .get(`http://localhost:35000/user/${currentUserId}`)
      .then((userconnected) => {
        console.log(userconnected);
        setUserConnectedInfo(userconnected.data[0]);
        setloadingUserConnectedInfo(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getUserconnected();
  }, []);

  const disconnect = () => {
    window.localStorage.removeItem("token");
    setLogIn(false);
  };
  return (
    <div className="sidebar">
      <div className="user-info">
        <div className="avatar">
          <Avatar
            url={loadingUserConnectedInfo ? "" : userconnectedInfo.profil}
          />
        </div>
        <span className="user-name">
          {loadingUserConnectedInfo ? "" : userconnectedInfo.name}
        </span>
      </div>
      <div className="navigation">
        <div
          className="menu-icon"
          onClick={() => setSectionContactSelected(false)}
        >
          <AiFillMessage />
        </div>

        <div
          className="menu-icon"
          onClick={() => setSectionContactSelected(true)}
        >
          <IoIosContacts />
        </div>
      </div>
      <div className="logout" onClick={disconnect}>
        <FiLogOut />
      </div>
    </div>
  );
};

export default Sidebar;
