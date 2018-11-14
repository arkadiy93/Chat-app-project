import React from 'react';

const ChannelList = ({ initialChannels }) => (
  <ul>
    {initialChannels.map(({ id, name }) => <li className="trol" key={id}>{name}</li>)}
  </ul>
);

export default ChannelList;
