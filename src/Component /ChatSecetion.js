import React, { useContext, useState, useEffect, useRef } from "react";
import ContactTile from "./ContactTile";
import CardMessage from "./CardMessage";
import { generalContext } from "../GeneralContext";
import axios from "axios";
import { MdAddAPhoto } from "react-icons/md";
import { BiSend } from "react-icons/bi";
import { socket } from "../GeneralContext";
import Loadercomponent from "./Loadercomponent";
import Illustration from "./Illustration";

const ChatSecetion = () => {
  const { currentConversationWife } = useContext(generalContext);
  console.log(currentConversationWife);
  const { currentConversationUserDetail } = useContext(generalContext);
  const { userconnectedInfo } = useContext(generalContext);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [contentMessage, setContentMessage] = useState("");
  const { currentToken } = useContext(generalContext);
  const bottomRef = useRef();

  //   const [resetInput, setResetInput] = useState();
  const [sendImageValue, setSendImageValue] = useState([]);

  console.log(sendImageValue[0]);

  const getAllmessages = () => {
    axios({
      method: "get",
      url: `${process.env.REACT_APP_BASE_URL}/message/conversation/${currentConversationWife._id}`,
      data: {
        moi: userconnectedInfo,
        corespondant: currentConversationWife._id,
      },
      headers: {
        Authorization: `${currentToken}`,
      },
    }).then((data) => {
      setMessages(data.data.conversation.message);
      setIsloading(false);
      console.log(data.data);
    });
  };

  const sendMessageWithImage = () => {
    const formData = new FormData();
    formData.append("file", sendImageValue[0]);
    formData.append("upload_preset", "pw405zry");
    console.log("les fordata", formData);
    console.log("sendimavalue", sendImageValue[0]);

    axios
      .post("https://api.cloudinary.com/v1_1/dvewnctgf/image/upload", formData)
      .then((imageSaved) => {
        console.log(imageSaved.data.url);
        axios({
          method: "post",
          url: `${process.env.REACT_APP_BASE_URL}/message/message`,
          data: {
            id: currentConversationWife._id,
            to: currentConversationWife.corespondant,
            from: userconnectedInfo._id,
            message: contentMessage,
            media_id: imageSaved.data.public_id,
            media_url: imageSaved.data.url,
          },
          headers: {
            Authorization: `${currentToken}`,
          },
        }).then((data) => {
          getAllmessages();
          console.log(data, " message ajoutée avec succès");

          socket.emit("send_message", {
            id: currentConversationWife._id,
            to: currentConversationWife.corespondant,
            from: userconnectedInfo._id,
            message: contentMessage,
            media_id: imageSaved.data.public_id,
            media_url: imageSaved.data.url,
          });
        });
      })
      .catch((err) => console.log(err));
  };

  const sendMessage = () => {
    if (sendImageValue.length !== 0) {
      sendMessageWithImage();
    } else {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_BASE_URL}/message/message`,
        data: {
          id: currentConversationWife._id,
          to: currentConversationWife.corespondant,
          from: userconnectedInfo._id,
          message: contentMessage,
        },
        headers: {
          Authorization: `${currentToken}`,
        },
      }).then((data) => {
        getAllmessages();
        console.log(data, " message ajoutée avec succès");

        socket.emit("send_message", {
          id: currentConversationWife._id,
          to: currentConversationWife.corespondant,
          from: userconnectedInfo._id,
          message: contentMessage,
        });
      });
    }
    // setResetInput("");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      if (data) {
        getAllmessages();
      }
    });
    getAllmessages();
    bottomRef.current?.scrollIntoView();
  }, [currentConversationWife._id, socket]);

  return (
    <>
      {!currentConversationWife._id ? (
        <div className="chatSection">
          <Illustration image="welcome.gif" />
          <p></p>
        </div>
      ) : (
        <div className="chatSection">
          <div className="user-info">
            <ContactTile
              name={
                currentConversationUserDetail &&
                currentConversationUserDetail[1]
              }
              image={
                currentConversationUserDetail &&
                currentConversationUserDetail[0]
              }
              label={"En ligne"}
            />
          </div>

          {isLoading ? (
            <div className="loader-message">
              <Loadercomponent />
            </div>
          ) : !messages.length ? (
            <div className="loader-message">
              <Illustration image="chatting-amico.svg" />
            </div>
          ) : (
            <>
              <div className="messages-container">
                {messages &&
                  messages.map((message) => {
                    return message.message ? (
                      <CardMessage
                        author={
                          userconnectedInfo._id === message.from ? "to" : "from"
                        }
                        message={message.message}
                        key={message._id}
                        image={message.media_url}
                      />
                    ) : message.media_url ? (
                      <CardMessage
                        author={
                          userconnectedInfo._id === message.from ? "to" : "from"
                        }
                        message={message.message}
                        key={message._id}
                        image={message.media_url}
                      />
                    ) : (
                      ""
                    );
                  })}
                <div ref={bottomRef} />;
              </div>
            </>
          )}
          <div className="sender-messages-container">
            <div className="form">
              <div className="form-send-message">
                <input
                  type="text"
                  onChange={(e) => {
                    setContentMessage(e.target.value);
                    {
                      /* setResetInput(contentMessage); */
                    }
                  }}
                />
                <label htmlFor="file" className="file-upload">
                  <div className="fileUploadButton">
                    <MdAddAPhoto />
                  </div>
                </label>
                <input
                  accept="image/*"
                  id="file"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) => setSendImageValue(e.target.files)}
                />
              </div>
              <button onClick={sendMessage}>
                <BiSend />
              </button>
            </div>
          </div>
        </div>
      )}{" "}
    </>
  );
};
export default ChatSecetion;
