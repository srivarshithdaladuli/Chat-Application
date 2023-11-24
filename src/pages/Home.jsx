import React from 'react';
import Sidebar from '../components/Sidebar';
import Chat from '../components/Chat';

// Component representing the home page with a sidebar and chat
const Home = () => {
  return (
    <div className='home'>
      {/* Container to hold the Sidebar and Chat components */}
      <div className="container">
        {/* Sidebar component for user navigation and chat selection */}
        <Sidebar/>
        {/* Chat component for displaying and interacting with chat messages */}
        <Chat/>
      </div>
    </div>
  );
};

// Exporting the Home component as the default export
export default Home;
