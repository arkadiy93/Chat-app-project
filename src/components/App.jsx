import React from 'react';
import SideBar from './SideBar.jsx';
import MainField from './MainField.jsx';

const App = ({ initialData }) => {
  const { channels } = initialData;
  return (
    <div>
      <SideBar initialChannels={channels} />
      <MainField />
    </div>
  );
};

export default App;
