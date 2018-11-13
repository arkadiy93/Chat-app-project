import React from 'react';
import ChannelList from './ChannelList.jsx';

const App = ({ initialData }) => {
  const { channels } = initialData;
  return (
    <ChannelList initialChannels={channels} />
  );
};

export default App;
