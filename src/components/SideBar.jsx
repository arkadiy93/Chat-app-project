import React from 'react';
import { DataConsumer } from './DataContext';


const renderChannels = channels => (
  <ul>
    {channels.map(({ id, name }) => (
      <li key={id}>{`# ${name}`}</li>
    ))}
  </ul>
);


const SideBar = () => (
  <DataConsumer>
    {({ channels }) => (
      <div className="sidebar col-2" align="center">
        <div className="sidebar-header">
          <h5>Channels</h5>
        </div>
        <div className="sidebar-content">
          {renderChannels(channels)}
        </div>
      </div>
    )}
  </DataConsumer>
);

export default SideBar;
