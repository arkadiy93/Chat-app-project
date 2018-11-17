import { createAction } from 'redux-actions';
import axios from 'axios';

import routes from '../routes';

export const sendMessageRequest = createAction('SEND_MESSAGE_REQUEST');
export const sendMessageSuccess = createAction('SEND_MESSAGE_SUCCESS');
export const sendMessageFailure = createAction('SEND_MESSAGE_FAILURE');

export const addMessageToList = createAction('ADD_MESSAGE_TO_LIST');
export const initializeMessageList = createAction('INITIALIZE_MESSAGE_LIST');

export const sendMessage = data => async (dispatch) => {
  dispatch(sendMessageRequest());
  const { channelId, message, author } = data;
  try {
    const response = await axios.post(routes.messagesUrl(channelId), {
      data: {
        attributes: { message, author },
      },
    });
    dispatch(sendMessageSuccess({ task: response.data }));
  } catch (e) {
    dispatch(sendMessageFailure());
  }
};
