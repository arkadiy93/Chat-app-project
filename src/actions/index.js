import { createAction } from 'redux-actions';
import axios from 'axios';
import { SubmissionError } from 'redux-form';


import routes from '../routes';

export const closeModalWindow = createAction('MODAL_WINDOW_CLOSE');

export const askChannelName = createAction('CHANNEL_NAME_ASK');
export const showDeleteConfirmation = createAction('DELETE_CONFIRMATION_SHOW');
export const showRenameInput = createAction('RENAME_INPUT_SHOW');

export const initializeChannelList = createAction('CHANNEL_LIST_INITIALIZE');
export const changeChannel = createAction('CHANNEL_CHANGE');
export const addChannelToList = createAction('CHANNEL_ADD_TO_LIST');
export const removeChannelFromList = createAction('CHANNEL_REMOVE_FROM_LIST');
export const renameTargetedChannel = createAction('TARGETED_CHANNEL_RENAME');

export const addChannelRequest = createAction('CHANNEL_ADD_REQUEST');
export const addChannelSuccess = createAction('CHANNEL_ADD_SUCCESS');
export const addChannelFailure = createAction('CHANNEL_ADD_FAILURE');

export const renameChannelRequest = createAction('CHANNEL_RENAME_REQUEST');
export const renameChannelSuccess = createAction('CHANNEL_RENAME_SUCCESS');
export const renameChannelFailure = createAction('CHANNEL_RENAME_FAILURE');

export const deleteChannelRequest = createAction('CHANNEL_DELETE_REQUEST');
export const deleteChannelSuccess = createAction('CHANNEL_DELETE_SUCCESS');
export const deleteChannelFailure = createAction('CHANNEL_DELETE_FAILURE');

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

export const deleteChannel = (targetChannelId, currentChannelId) => async (dispatch) => {
  dispatch(deleteChannelRequest());
  try {
    const response = await axios.delete(routes.deleteChannelUrl(targetChannelId));
    dispatch(deleteChannelSuccess({ task: response.data }));
    if (targetChannelId === currentChannelId) {
      dispatch(changeChannel({ id: 1 }));
    }
    dispatch(closeModalWindow());
  } catch (e) {
    dispatch(deleteChannelFailure());
    throw e;
  }
};

export const addChannel = channelName => async (dispatch) => {
  dispatch(addChannelRequest());
  try {
    const response = await axios.post(routes.addChannelUrl(), {
      data: {
        attributes: { name: channelName },
      },
    });
    dispatch(addChannelSuccess({ task: response.data }));
    dispatch(closeModalWindow());
  } catch (e) {
    dispatch(addChannelFailure());
    throw e;
  }
};

export const renameChannel = (id, channelName) => async (dispatch) => {
  dispatch(renameChannelRequest());
  try {
    const response = await axios.patch(routes.renameChannelUrl(id), {
      data: {
        attributes: { name: channelName },
      },
    });
    dispatch(renameChannelSuccess({ task: response.data }));
    dispatch(closeModalWindow());
  } catch (e) {
    dispatch(renameChannelFailure());
    throw e;
  }
};
