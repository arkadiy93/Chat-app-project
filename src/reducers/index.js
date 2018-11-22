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

const channelsData = handleActions({
  [actions.initializeChannelList](state, { payload: { channels } }) {
    return { ...channels };
  },
}, {});

const modalData = handleActions({
  [actions.sendMessageFailure]() {
    return {
      modalType: 'INFO_MODAL',
      modalProps: {
        title: 'Connection Error',
        body: 'Your message was not sent',
        isOpen: true,
      },
    };
  },
  [actions.closeModalWindow]() {
    return { modalType: null, modalProps: {} };
  },
}, { modalType: null, modalProps: {} });

const currentChannel = handleActions({
  [actions.changeChannel](state, { payload: { id } }) {
    return id;
  },
}, 1);


export default combineReducers({
  form: formReducer,
  messagesData,
  messageSendingState,
  modalData,
  currentChannel,
  channelsData,
});
