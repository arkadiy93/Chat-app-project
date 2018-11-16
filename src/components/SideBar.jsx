import React from 'react';
import cn from 'classnames';
import { DataContext } from '../context/DataContext';

class SideBar extends React.Component {
  state = {
    openChannel: this.context.currentChannelId,
  }

  listClass = (id) => {
    const { openChannel } = this.state;
    return cn(
      'list-group-item',
      'list-group-item-action',
      {
        'list-group-item-success': id !== openChannel,
        'list-group-item-light': id === openChannel,
      },
    );
  };

  renderChannels = channels => (
    <ul className="list-group list-group-flush">
      {channels.map(({ id, name }) => (
        <li className={this.listClass(id)} key={id}>
          {`# ${name}`}
        </li>
      ))}
    </ul>
  );

  render() {
    const { channels } = this.context;

    return (
      <div className="col-2" align="center">
        <div className="">
          <h5>Channels</h5>
        </div>
        <div className="">
          {this.renderChannels(channels)}
        </div>
      </div>
    );
  }
}

SideBar.contextType = DataContext;
export default SideBar;
