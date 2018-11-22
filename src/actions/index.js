import { createAction } from 'redux-actions';
import axios from 'axios';
import { SubmissionError } from 'redux-form';

import routes from '../routes';

export const closeModalWindow = createAction('MODAL_WINDOW_CLOSE');

export const initializeChannelList = createAction('CHANNEL_LIST_INITIALIZE');
export const changeChannel = createAction('CHANNEL_CHANGE');

export const sendMessageRequest = createAction('MESSAGE_SEND_REQUEST');
export const sendMessageSuccess = createAction('MESSAGE_SEND_SUCCESS');
export const sendMessageFailure = createAction('MESSAGE_SEND_FAILURE');

export const addMessageToList = createAction('MESSAGE_ADD_TO_LIST');
export const initializeMessageList = createAction('MESSAGE_LIST_INITIALIZE');

export const sendMessage = ({ currentChannel, message, author }) => async (dispatch) => {
  if (!message || !message.trim()) {
    throw new SubmissionError('emtpy message');
  }
  dispatch(sendMessageRequest());
  try {
    const response = await axios.post(routes.messagesUrl(currentChannel), {
      data: {
        attributes: { message, author },
      },
    });
    dispatch(sendMessageSuccess({ task: response.data }));
  } catch (e) {
    dispatch(sendMessageFailure());
    throw e;
    // in case we dont throw an error, the returned value will be a fulfilled promise
  // and it will trigger "onSubmitSuccess" configuration  property
  }
};
