import React, { useContext, useState } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

// Component for the input field and sending messages in the chat
const Input = () => {
  // State to manage the input text and selected image
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  // Accessing the current user and chat data from the context
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  // Function to handle sending a message
  const handleSend = async () => {
    if (img) {
      // Uploading the image to Firebase Storage
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          // TODO: Handle error during image upload
        },
        () => {
          // Getting the download URL of the uploaded image
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // Updating the chat document with the new message (including image)
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      // Updating the chat document with the new message (text only)
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    // Updating the last message and date in the user's chat document
    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    // Updating the last message and date in the recipient's chat document
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    // Resetting the input text and image
    setText("");
    setImg(null);
  };

  // Rendering the input field and send button
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img src={Attach} alt="" />
        {/* Input for selecting a file (hidden) */}
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        {/* Label and image icon for file input */}
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        {/* Button to send the message */}
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

// Exporting the Input component as the default export
export default Input;
