import React, { useState } from "react";
import Add from "../img/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

// Component representing the registration page
const Register = () => {
  // State to manage error and loading status
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  // Hook from react-router-dom to navigate between pages
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    // Setting loading state to true during form submission
    setLoading(true);
    e.preventDefault();
    // Extracting user input from the form
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      // Creating a user with the provided email and password
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Creating a unique image name based on display name and date
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      // Uploading the avatar image to storage
      await uploadBytesResumable(storageRef, file).then(() => {
        // Getting the download URL for the uploaded image
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            // Updating the user profile with display name and avatar URL
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            // Creating a user document in the "users" collection in Firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            // Creating an empty user chats document in Firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});

            // Navigating to the home page upon successful registration
            navigate("/");
          } catch (err) {
            console.log(err);
            // Setting error state if there's an issue with updating Firestore
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      // Setting error state if there's an issue with user creation
      setErr(true);
      setLoading(false);
    }
  };

  // Rendering the Register component
  return (
    <div className="formContainer">
      {/* Wrapper for the registration form */}
      <div className="formWrapper">
        {/* Application logo */}
        <span className="logo">Text Me</span>
        {/* Title indicating the purpose of the form */}
        <span className="title">Register</span>
        {/* Form for user registration */}
        <form onSubmit={handleSubmit}>
          {/* Input field for display name */}
          <input required type="text" placeholder="display name" />
          {/* Input field for email */}
          <input required type="email" placeholder="email" />
          {/* Input field for password */}
          <input required type="password" placeholder="password" />
          {/* Input field for selecting an avatar image */}
          <input required style={{ display: "none" }} type="file" id="file" />
          {/* Label for the avatar input with an icon and text */}
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          {/* Button to submit the registration form */}
          <button disabled={loading}>Sign up</button>
          {/* Loading message during image upload */}
          {loading && "Uploading and compressing the image please wait..."}
          {/* Error message if there's an issue with registration */}
          {err && <span>Something went wrong</span>}
        </form>
        {/* Link to the login page */}
        <p>
          You do have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

// Exporting the Register component as the default export
export default Register;
