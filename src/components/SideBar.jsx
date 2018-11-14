import React from 'react';

const renderChannels = channels => (
  <ul>
    {channels.map(({ id, name }) => (
      <li className="active" key={id}>{`# ${name}`}</li>
    ))}
  </ul>
);

const SideBar = ({ initialChannels }) => (
  <div id="sidebar">
    <div className="sidebar-header">
      <h5>Channels</h5>
    </div>
    {renderChannels(initialChannels)}
  </div>
);

export default SideBar;
