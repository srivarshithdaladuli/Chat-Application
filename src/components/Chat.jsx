import React, { useContext } from "react";
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

// Functional component representing the chat interface
const Chat = () => {
  // Accessing the ChatContext to get data related to the chat
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      {/* Chat information section */}
      <div className="chatInfo">
        {/* Displaying the user's display name */}
        <span>{data.user?.displayName}</span>
        {/* Icons for additional chat functionalities */}
        <div className="chatIcons">
          <img src={Cam} alt="Camera" />
          <img src={Add} alt="Add" />
          <img src={More} alt="More" />
        </div>
      </div>
      {/* Component to display chat messages */}
      <Messages />
      {/* Component for user input in the chat */}
      <Input />
    </div>
  );
};

// Exporting the Chat component as the default export
export default Chat;
