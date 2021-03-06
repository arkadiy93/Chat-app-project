import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { reducer as formReducer } from 'redux-form';
import * as actions from '../actions';

const channelAddingState = handleActions({
  [actions.addChannelRequest]() {
    return 'requested';
  },
  [actions.addChannelFailure]() {
    return 'failed';
  },
  [actions.addChannelSuccess]() {
    return 'successed';
  },
  [actions.cleanChannelFailure]() {
    return 'none';
  },
}, 'none');

const channelDeletingState = handleActions({
  [actions.deleteChannelRequest]() {
    return 'requested';
  },
  [actions.deleteChannelFailure]() {
    return 'failed';
  },
  [actions.deleteChannelSuccess]() {
    return 'successed';
  },
  [actions.cleanChannelFailure]() {
    return 'none';
  },
}, 'none');

const channelRenamingState = handleActions({
  [actions.renameChannelRequest]() {
    return 'requested';
  },
  [actions.renameChannelFailure]() {
    return 'failed';
  },
  [actions.renameChannelSuccess]() {
    return 'successed';
  },
  [actions.cleanChannelFailure]() {
    return 'none';
  },
}, 'none');

const messagesData = handleActions({
  [actions.addMessageToList](state, { payload: { attributes } }) {
    return { ...state, [attributes.id]: attributes };
  },
  [actions.initializeMessageList](state, { payload: { messages } }) {
    return _.keyBy(messages, 'id');
  },
  [actions.removeChannelFromList](state, { payload: { id } }) {
    return _.pickBy(state, ({ channelId }) => channelId !== id);
    // here we filtrate with pickBy the state since our messages are listed by message id
  },
}, {});

const channelsData = handleActions({
  [actions.addChannelToList](state, { payload: { attributes } }) {
    const res = { ...state, [attributes.id]: attributes };
    return res;
  },
  [actions.initializeChannelList](state, { payload: { channels } }) {
    return _.keyBy(channels, 'id');
  },
  [actions.removeChannelFromList](state, { payload: { id } }) {
    return _.omit(state, id);
  },
  [actions.renameTargetedChannel](state, { payload: { data } }) {
    const { id, name } = data;
    return { ...state, [id]: { ...state[id], name } };
  },
}, {});

const modalData = handleActions({
  [actions.showConnectionError]() {
    return {
      modalType: 'INFO_MODAL',
      modalProps: {
        title: 'Connection Error',
        body: 'Your message was not sent',
        isOpen: true,
      },
    };
  },
  [actions.askChannelName]() {
    return {
      modalType: 'ADD_CHANNEL_MODAL',
      modalProps: {
        title: 'Channel information',
        body: 'Set a name for your channel: ',
        isOpen: true,
      },
    };
  },
  [actions.showDeleteConfirmation](state, { payload: { id } }) {
    return {
      modalType: 'CONFIRM_DELETE_MODAL',
      modalProps: {
        title: 'Delete confirmation',
        body: 'Are you sure you want to delete this channel? ',
        isOpen: true,
        id,
      },
    };
  },
  [actions.showRenameInput](state, { payload: { data: { id, targetName } } }) {
    return {
      modalType: 'RENAME_CHANNEL_MODAL',
      modalProps: {
        title: 'Channel information',
        body: 'Set a new name for your channel: ',
        isOpen: true,
        targetName,
        id,
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
  modalData,
  currentChannel,
  channelsData,
  channelAddingState,
  channelRenamingState,
  channelDeletingState,
});
