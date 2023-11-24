import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import Chats from "./Chats";

// Component representing the sidebar containing Navbar, Search, and Chats components
const Sidebar = () => {
  // Rendering the Sidebar component
  return (
    <div className="sidebar">
      {/* Navbar component for user navigation */}
      <Navbar />
      {/* Search component for searching and selecting users */}
      <Search />
      {/* Chats component for displaying the list of user chats */}
      <Chats />
    </div>
  );
};

// Exporting the Sidebar component as the default export
export default Sidebar;
