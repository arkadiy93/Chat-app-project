import React from 'react';
import { connect } from 'react-redux';
import InputForm from './InputForm';
import * as actionCreators from '../actions';
import { messagesSelector } from '../selectors';

const mapStateToProps = (state) => {
  const { currentChannel } = state;
  const props = {
    messagesData: messagesSelector(state),
    currentChannel,
  };
  return props;
};

const renderMessages = (currentChannel, messages) => {
  const channelMessages = messages
    .filter(({ channelId }) => channelId === currentChannel)
    .reverse();
  if (channelMessages.length === 0) return null;
  return channelMessages.map(({ message, author, id }) => (
    <div key={id}>
      <b>{ author }</b>
      <p>{ message }</p>
    </div>
  ));
};

@connect(mapStateToProps, actionCreators)
class MainField extends React.Component {
  render() {
    const { messagesData, currentChannel } = this.props;
    return (
      <div className="col">
        <div className="row input">
          <div className="col-lg-12">
            <InputForm />
          </div>
        </div>
        <div className="bg-white pre-scrollable">
          {renderMessages(currentChannel, messagesData)}
        </div>
      </div>
    );
  }
}

export default MainField;
