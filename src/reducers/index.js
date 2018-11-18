// import { omit, keyBy } from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const messageSendingState = handleActions({
  [actions.sendMessageRequest]() {
    return 'requested';
  },
  [actions.sendMessageFailure]() {
    return 'failed';
  },
  [actions.sendMessageSuccess]() {
    return 'successed';
  },
}, 'none');

const messagesData = handleActions({
  [actions.addMessageToList](state, { payload: { attributes } }) {
    return { ...state, [attributes.id]: attributes };
  },
  [actions.initializeMessageList](state, { payload: { messages } }) {
    return { ...messages };
  },
}, {});

const modalData = handleActions({
  [actions.sendMessageFailure]() {
    return {
      isOpen: 'true',
      title: 'Connection Error',
      body: 'Your message was not sent',
    };
  },
  [actions.closeModalWindow]() {
    return { isOpen: false };
  },
}, { isOpen: false });


export default combineReducers({
  form: formReducer,
  messagesData,
  messageSendingState,
  modalData,
});
