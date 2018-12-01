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
  constructor(props) {
    super(props);
    this.messagesWindowRef = React.createRef();
  }

  componentDidMount() {
    this.scrollDownMessages();
  }

  componentDidUpdate() {
    this.scrollDownMessages();
  }

  scrollDownMessages() {
    const targetNode = this.messagesWindowRef.current;
    targetNode.scrollTop = targetNode.scrollHeight;
  }

  render() {
    const { messagesData } = this.props;
    return (
      <div className="col pr-0 d-flex flex-column my-3">
        <div className="bg-white messages-window flex-grow-1 mx-100" ref={this.messagesWindowRef}>
          {renderMessages(messagesData)}
        </div>
        <div className="row input mw-100">
          <div className="col-lg-12 mw-100">
            <InputForm />
          </div>
        </div>
      </div>
    );
  }
}

export default MainField;
