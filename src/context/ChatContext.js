import {
  createContext,
  useContext,
  useReducer,
} from "react";
import { AuthContext } from "./AuthContext";

// Creating a context to manage chat-related state
export const ChatContext = createContext();

// Creating a provider component to manage chat-related state and provide it to the app
export const ChatContextProvider = ({ children }) => {
  // Accessing the current user from the AuthContext
  const { currentUser } = useContext(AuthContext);

  // Initial state for the chat context
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  // Reducer function to handle state transitions based on actions
  const chatReducer = (state, action) => {
    switch (action.type) {
      // Action to change the current user in the chat context
      case "CHANGE_USER":
        return {
          user: action.payload,
          // Generating a chat ID based on user IDs to uniquely identify the chat
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };

      // Default case to handle other actions
      default:
        return state;
    }
  };

  // Using the useReducer hook to manage state with the defined reducer and initial state
  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  // Providing the ChatContext with the current state and dispatch function to its descendants
  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {/* Rendering the children components */}
      {children}
    </ChatContext.Provider>
  );
};
