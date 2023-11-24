// Importing React and ReactDOM from the appropriate modules
import React from "react";
import ReactDOM from "react-dom/client";
// Importing the main App component
import App from "./App";
// Importing context providers for AuthContext and ChatContext
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";

// Creating a root using ReactDOM.createRoot for concurrent mode rendering
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendering the App component within context providers and StrictMode
root.render(
  // Wrapping the App component with AuthContextProvider for authentication context
  <AuthContextProvider>
    {/* Wrapping the App component with ChatContextProvider for chat-related context */}
    <ChatContextProvider>
      {/* Enabling React StrictMode for additional development checks */}
      <React.StrictMode>
        {/* Rendering the main App component */}
        <App />
      </React.StrictMode>
    </ChatContextProvider>
  </AuthContextProvider>
);
