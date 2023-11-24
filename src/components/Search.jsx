import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

// Component for searching and selecting users to start a chat
const Search = () => {
  // State to manage the input username, selected user, and error status
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  // Accessing the current user from the context
  const { currentUser } = useContext(AuthContext);

  // Function to handle the search for a user
  const handleSearch = async () => {
    // Creating a Firestore query to find users by display name
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      // Executing the query and updating the state with the user data
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
      // Resetting error state if successful
      setErr(false);
    } catch (err) {
      // Setting error state if there's an issue with the query
      setErr(true);
    }
  };

  // Function to handle pressing the Enter key in the search input
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  // Function to handle selecting a user and creating a chat
  const handleSelect = async () => {
    // Creating a combined ID for the chat based on user IDs
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      // Checking whether the chat exists in the chats collection
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        // Creating a chat in the chats collection if it doesn't exist
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // Updating userChats for the current user
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        // Updating userChats for the selected user
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      // Handling errors, if any
    }

    // Resetting state after selecting a user
    setUser(null);
    setUsername("");
  };

  // Rendering the Search component
  return (
    <div className="search">
      {/* Search input */}
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {/* Displaying an error message if user not found */}
      {err && <span>User not found!</span>}
      {/* Displaying the selected user for chat */}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Exporting the Search component as the default export
export default Search;
