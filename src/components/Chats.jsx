import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

// Component representing the list of chats
const Chats = () => {
  // State to hold the list of chats
  const [chats, setChats] = useState([]);

  // Accessing the current user and chat context
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  // Effect to fetch and update the list of chats when the current user changes
  useEffect(() => {
    const getChats = () => {
      // Setting up a snapshot listener for the user's chat document in Firestore
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        const data = doc.data();
        if (data) {
          // Updating the state with the chat data
          setChats(data);
        }
      });

      // Cleanup function to unsubscribe from the snapshot listener when the component unmounts or the user changes
      return () => {
        unsub();
      };
    };

    // Fetching chats only when there's a valid current user
    if (currentUser.uid) {
      getChats();
    }
  }, [currentUser.uid]);

  // Function to handle selecting a chat user
  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  // Rendering the list of user chats
  return (
    <div className="chats">
      {chats.length > 0 &&
        // Sorting and mapping through the list of chats
        Object.entries(chats)
          .sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <div
              className="userChat"
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              {/* Displaying the user's profile image */}
              <img src={chat[1].userInfo.photoURL} alt="" />
              {/* Displaying user chat information */}
              <div className="userChatInfo">
                <span>{chat[1].userInfo.displayName}</span>
                <p>{chat[1].lastMessage?.text}</p>
              </div>
            </div>
          ))}
    </div>
  );
};

// Exporting the Chats component as the default export
export default Chats;
