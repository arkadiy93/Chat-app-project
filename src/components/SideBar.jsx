import React from 'react';
import { DataConsumer } from './DataContext';


const renderChannels = channels => (
  <ul>
    {channels.map(({ id, name }) => (
      <li className="active" key={id}>{`# ${name}`}</li>
    ))}
  </ul>
);

const SideBar = () => (
  <DataConsumer>
    {({ channels }) => (
      <div id="sidebar">
        <div className="sidebar-header">
          <h5>Channels</h5>
        </div>
        {renderChannels(channels)}
      </div>
    )}
  </DataConsumer>
);

export default SideBar;
