import React from 'react';
import InputForm from './InputForm';
import { channelsMessagesSelector } from '../selectors';
import connect from '../connect';

const mapState = () => {
  const getMessages = channelsMessagesSelector();
  return (state) => {
    const { currentChannel } = state;
    const props = {
      messagesData: getMessages(state, currentChannel),
      currentChannel,
    };
    return props;
  };
};

const renderMessages = (messages) => {
  if (messages.length === 0) return null;
  return messages.map(({ message, author, id }) => (
    <div key={id}>
      <b>{ author }</b>
      <p>{ message }</p>
    </div>
  ));
};

@connect(mapState)
class MainField extends React.Component {
  render() {
    const { messagesData } = this.props;
    return (
      <div className="col">
        <div className="row input">
          <div className="col-lg-12">
            <InputForm />
          </div>
        </div>
        <div className="bg-white pre-scrollable">
          {renderMessages(messagesData)}
        </div>
      </div>
    );
  }
}

export default MainField;
