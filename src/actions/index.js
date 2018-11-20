import { createAction } from 'redux-actions';
import axios from 'axios';
import cookies from 'js-cookie';

import routes from '../routes';

export const closeModalWindow = createAction('CLOSE_MODAL_WINDOW');

export const initializeChannelList = createAction('INITIALIZE_CHANNEL_LIST');

export const changeChannel = createAction('CHANGE_CHANNEL');

export const sendMessageRequest = createAction('SEND_MESSAGE_REQUEST');
export const sendMessageSuccess = createAction('SEND_MESSAGE_SUCCESS');
export const sendMessageFailure = createAction('SEND_MESSAGE_FAILURE');

export const addMessageToList = createAction('ADD_MESSAGE_TO_LIST');
export const initializeMessageList = createAction('INITIALIZE_MESSAGE_LIST');

export const sendMessage = ({ currentChannel, message, author }) => async (dispatch) => {
  dispatch(sendMessageRequest());
  try {
    const response = await axios.post(routes.messagesUrl(currentChannel), {
      data: {
        attributes: { message, author },
      },
    });
    dispatch(sendMessageSuccess({ task: response.data }));
  } catch (e) {
    console.log(e);
    dispatch(sendMessageFailure());
  }
};
