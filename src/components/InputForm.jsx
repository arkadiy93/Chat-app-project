import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { DataConsumer } from '../context/DataContext';
import connect from '../connect';

const mapStateToProps = ({ currentChannel }) => {
  const props = {
    currentChannel,
  };
  return props;
};

@connect(mapStateToProps)
@reduxForm({
  form: 'newMessage',
  onSubmitSuccess: (...args) => {
    const [,, props] = args;
    props.reset();
  },
})
class InputForm extends React.Component {
  sendMessage = author => ({ message }) => {
    const { sendMessage, currentChannel } = this.props;
    return sendMessage({ currentChannel, message, author });
  };

  render() {
    const { handleSubmit, submitting } = this.props;
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
              disabled={submitting}
            />
            <span className="input-group-btn">
              <button
                className="btn btn-default btn-lg"
                type="submit"
                disabled={submitting}
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
