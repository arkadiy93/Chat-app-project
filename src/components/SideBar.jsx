import React from 'react';
import cn from 'classnames';
import { DataContext } from '../context/DataContext';

class SideBar extends React.Component {
  // this is temporary. Will be changed as soon as i add more functionality
  state = {
    openChannel: this.context.currentChannelId,
  };

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

  addChannel = () => {

  }

  renderChannels = channels => (
    <div className="list-group list-group-flush">
      <button
        className="list-group-item list-group-item-warning list-group-item-action"
        type="button"
        onClick={this.addChannel}
      >
      Add channel
      </button>
      {channels.map(({ id, name }) => (
        <button type="button" className={this.listClass(id)} key={id}>
          {`# ${name}`}
        </button>
      ))}
    </div>
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
