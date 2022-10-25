import React from "react";
import { MdAddAPhoto } from "react-icons/md";
import { BiSend } from "react-icons/bi";

const SenderMessageForm = () => {
  return (
    <div className="form">
      <div className="form-send-message">
        <input type="text" />
        <MdAddAPhoto />
      </div>
      <button>
        <BiSend />
      </button>
    </div>
  );
};

export default SenderMessageForm;
