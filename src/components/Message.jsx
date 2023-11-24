import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

// Component representing an individual message in the chat
const Message = ({ message }) => {
  // Accessing the current user and chat data from the context
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  // Using useRef to scroll the message into view when it is rendered
  const ref = useRef();

  useEffect(() => {
    // Scroll the message into view with smooth behavior when it updates
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  // Rendering the message component
  return (
    <div
      ref={ref}
      // Applying styles based on whether the message is from the owner (current user)
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      {/* Displaying the message information */}
      <div className="messageInfo">
        <img
          // Displaying the profile image of the sender
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        {/* Displaying a timestamp (in this case, "just now") */}
        <span>just now</span>
      </div>
      {/* Displaying the content of the message */}
      <div className="messageContent">
        {/* Displaying the text of the message */}
        <p>{message.text}</p>
        {/* Displaying an image if the message includes one */}
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

// Exporting the Message component as the default export
export default Message;
