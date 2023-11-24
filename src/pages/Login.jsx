import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

// Component representing the login page
const Login = () => {
  // State to manage error status
  const [err, setErr] = useState(false);

  // Hook from react-router-dom to navigate between pages
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Extracting email and password from the form input fields
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      // Attempting to sign in with the provided email and password
      await signInWithEmailAndPassword(auth, email, password);
      // Navigating to the home page upon successful login
      navigate("/");
    } catch (err) {
      // Setting error state if there's an issue with the login
      setErr(true);
    }
  };

  // Rendering the Login component
  return (
    <div className="formContainer">
      {/* Wrapper for the login form */}
      <div className="formWrapper">
        {/* Application logo */}
        <span className="logo">Text Me</span>
        {/* Title indicating the purpose of the form */}
        <span className="title">Login</span>
        {/* Form for user login */}
        <form onSubmit={handleSubmit}>
          {/* Input field for email */}
          <input type="email" placeholder="email" />
          {/* Input field for password */}
          <input type="password" placeholder="password" />
          {/* Button to submit the login form */}
          <button>Sign in</button>
          {/* Displaying an error message if there's an issue with login */}
          {err && <span>Something went wrong</span>}
        </form>
        {/* Link to the registration page */}
        <p>You don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

// Exporting the Login component as the default export
export default Login;
