import React from 'react';
import { Field, reduxForm } from 'redux-form';
import cookies from 'js-cookie';
import { DataConsumer } from '../context/DataContext';

const sendMessage = (props, channelId) => ({ message }) => {
  if (!props.dirty || !message.trim()) return;
  const author = cookies.get('name');
  props.sendMessage({
    channelId,
    message,
    author,
  });
  props.reset();
};

const InputForm = (props) => {
  const { handleSubmit, messageSendingState } = props;
  const disabled = messageSendingState === 'requested';
  //
  return (
    <DataConsumer>
      {({ currentChannelId }) => (
        <form
          onSubmit={handleSubmit(sendMessage(props, currentChannelId))}
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
      )}
    </DataConsumer>

  );
};

export default reduxForm({
  form: 'newMessage',
})(InputForm);


//   axios.post('api/v1/channels/1/messages', {
//     data: {
//       attributes: {
//         text: 'trol',
//         author: 'Alex',
//       },
//     },
//   })
//     .then((res) => {
//       console.log(res);
//     }).catch((err) => {
//       console.log(err);
//     });
