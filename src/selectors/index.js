import { createSelector } from 'reselect';

const getMessagesData = state => state.messagesData;
const getCurrentChannel = (state, currentChannel) => currentChannel;
const getChannels = state => state.channelsData;

export const channelsMessagesSelector = () => createSelector(
  getCurrentChannel,
  getMessagesData,
  (currentChannel, data) => Object.values(data)
    .filter(({ channelId }) => channelId === currentChannel),
);

export const channelsSelector = createSelector(
  getChannels,
  data => Object.values(data),
);
