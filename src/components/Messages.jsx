import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Message from "./Message";

// Component responsible for displaying the messages in the chat
const Messages = () => {
  // State to hold the messages for the current chat
  const [messages, setMessages] = useState([]);
  
  // Accessing the chat data from the context
  const { data } = useContext(ChatContext);

  // Effect to subscribe to real-time updates of messages in the chat
  useEffect(() => {
    // Setting up a snapshot listener for the chat document in Firestore
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      // Checking if the document exists before updating the messages state
      doc.exists() && setMessages(doc.data().messages);
    });

    // Cleanup function to unsubscribe from the snapshot listener when the component unmounts or the chat changes
    return () => {
      unSub();
    };
  }, [data.chatId]);

  // Logging the messages to the console (for debugging purposes)
  console.log(messages);

  // Rendering the messages in the chat
  return (
    <div className="messages">
      {/* Mapping through the messages and rendering each Message component */}
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

// Exporting the Messages component as the default export
export default Messages;
