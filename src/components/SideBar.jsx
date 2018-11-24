import React from 'react';
import cn from 'classnames';
import Octicon, { Plus, Pencil, Trashcan } from '@githubprimer/octicons-react';
import connect from '../connect';
import { channelsSelector } from '../selectors';

const mapStateToProps = (state) => {
  const { currentChannel } = state;
  const props = {
    channelsData: channelsSelector(state),
    currentChannel,
  };
  return props;
};

const renderOptions = () => (
  <div>
    <button
      type="button"
      className="btn btn-outline-light border-0 text-dark"
      title="Rename channel"
    >
      <Octicon icon={Pencil} ariaLabel="Edit channel name" />
    </button>
    <button
      type="button"
      className="btn btn-outline-light border-0 text-dark"
      title="Delete channel"
    >
      <Octicon icon={Trashcan} ariaLabel="Delete channel" />
    </button>
  </div>
);

@connect(mapStateToProps)
class SideBar extends React.Component {
  listClass = (id) => {
    const { currentChannel } = this.props;
    return cn(
      'list-group-item',
      'list-group-item-action',
      'd-flex flex-row',
      {
        'list-group-item-success': id === currentChannel,
        'list-group-item-light': id !== currentChannel,
      },
    );
  };

  changeChannel = id => (e) => {
    e.preventDefault();
    const { changeChannel } = this.props;
    changeChannel({ id });
  }

  preventFocus = (e) => {
    e.preventDefault();
  }

  handleAddButton = () => {
    const { askChannelName } = this.props;
    askChannelName();
  }

  renderChannels = channels => (
    <div className="list-group list-group-flush">
      <button
        className="btn btn-outline-dark border-0 w-50"
        type="button"
        title="Add new channel"
        onMouseDown={this.preventFocus}
        onClick={this.handleAddButton}
      >
        <Octicon icon={Plus} ariaLabel="Add new item" />
      </button>
      {channels.map(({ id, name, removable }) => (
        <a
          role="button"
          href="/"
          className={this.listClass(id)}
          onClick={this.changeChannel(id)}
          onMouseDown={this.preventFocus}
          key={id}
        >
          <span className="p-2 mr-auto">{`# ${name}`}</span>
          {removable ? renderOptions() : null}
        </a>
      ))}
    </div>
  );

  render() {
    const { channelsData } = this.props;
    return (
      <div className="col-3" align="center">
        <div className="">
          <h5>Channels</h5>
        </div>
        <div className="">
          {this.renderChannels(channelsData)}
        </div>
      </div>
    );
  }
}

export default SideBar;
