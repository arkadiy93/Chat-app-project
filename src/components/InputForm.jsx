import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import { DataConsumer } from '../context/DataContext';

const mapStateToProps = ({ messageSendingState, currentChannel }) => {
  const props = {
    messageSendingState,
    currentChannel,
  };
  return props;
};

@connect(mapStateToProps, actionCreators)
@reduxForm({ form: 'newMessage' })
class InputForm extends React.Component {
  sendMessage = author => ({ message }) => {
    const {
      dirty,
      sendMessage,
      currentChannel,
      reset,
    } = this.props;
    if (!dirty || !message.trim()) return;
    sendMessage({ currentChannel, message, author });
    reset();
  };

  render() {
    const { handleSubmit, messageSendingState } = this.props;
    const disabled = messageSendingState === 'requested';

    return (
      <DataConsumer>
        {author => (
          <form
            onSubmit={handleSubmit(this.sendMessage(author))}
            className="input-group input-group-lg"
          >
            <Field
              name="message"
              type="text"
              className="form-control input-lg"
              placeholder="Type message..."
              component="input"
            />
            <span className="input-group-btn">
              <button
                className="btn btn-default btn-lg"
                type="submit"
                disabled={disabled}
              >
              Send
              </button>
            </span>
          </form>
        )
      }
      </DataConsumer>
    );
  }
}

export default InputForm;
