import React, { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';

// Component representing the navigation bar
const Navbar = () => {
  // Accessing the current user from the context
  const { currentUser } = useContext(AuthContext);

  // Rendering the Navbar component
  return (
    <div className='navbar'>
      {/* Logo for the application */}
      <span className="logo">Text Me</span>
      {/* Displaying user information and logout button */}
      <div className="user">
        {/* User profile image */}
        <img src={currentUser.photoURL} alt="" />
        {/* User display name */}
        <span>{currentUser.displayName}</span>
        {/* Button to log out the user */}
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  );
};

// Exporting the Navbar component as the default export
export default Navbar;
