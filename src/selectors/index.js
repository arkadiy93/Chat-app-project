import { createSelector } from 'reselect';

const getMessagesData = state => state.messagesData;
const getChannels = state => state.channelsData;

export const messagesSelector = createSelector(
  getMessagesData,
  data => Object.values(data),
);

export const channelsSelector = createSelector(
  getChannels,
  data => Object.values(data),
);
