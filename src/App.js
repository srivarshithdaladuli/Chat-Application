// Importing React components and styles
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./style.scss"; // Importing the styles for the application
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

// Function component representing the main App
function App() {
  // Accessing the current user from the AuthContext
  const { currentUser } = useContext(AuthContext);

  // Custom ProtectedRoute component to redirect to login if user is not authenticated
  const ProtectedRoute = ({ children }) => {
    // If no user is authenticated, navigate to the login page
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    // Render the children components if the user is authenticated
    return children;
  };

  // Rendering the main application using BrowserRouter and React Router
  return (
    <BrowserRouter>
      {/* Defining the route structure of the application */}
      <Routes>
        <Route path="/">
          {/* Index route for the home page */}
          <Route
            index
            element={
              // Wrapping the Home component in the ProtectedRoute to ensure authentication
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          {/* Route for the login page */}
          <Route path="login" element={<Login />} />
          {/* Route for the registration page */}
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// Exporting the App component as the default export
export default App;
